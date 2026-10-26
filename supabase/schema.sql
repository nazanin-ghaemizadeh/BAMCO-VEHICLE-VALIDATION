create table public.bam_validation_records (
 owner_id uuid not null references auth.users(id) on delete cascade,
 id text not null check (length(id) between 1 and 160),
 payload jsonb not null check (jsonb_typeof(payload) = 'object' and octet_length(payload::text) <= 150000),
 updated_at timestamptz not null default now(),
 primary key (owner_id,id),
 constraint bam_record_id_matches check (payload->>'id' = id),
 constraint bam_record_shape check (
 (id='programme-settings' and payload->>'mode' in ('reference','regional') and jsonb_typeof(payload->'target')='number' and (payload->>'target')::numeric between 2000 and 5000)
 or
 (id<>'programme-settings' and payload->>'panel' in ('drive','durability') and payload->>'mode' in ('reference','regional','endurance')
 and jsonb_typeof(payload->'day')='number' and (payload->>'day')::numeric between 1 and 160
 and length(trim(payload->>'vehicle'))>0 and length(trim(payload->>'driver'))>0
 and jsonb_typeof(payload->'odoStart')='number' and jsonb_typeof(payload->'odoEnd')='number'
 and (payload->>'odoStart')::numeric>=0 and (payload->>'odoEnd')::numeric >= (payload->>'odoStart')::numeric
 and jsonb_typeof(payload->'results')='array'))
);
alter table public.bam_validation_records enable row level security;
revoke all on public.bam_validation_records from anon;
grant select,insert,update on public.bam_validation_records to authenticated;
create policy bam_records_select_own on public.bam_validation_records for select to authenticated using ((select auth.uid())=owner_id);
create policy bam_records_insert_own on public.bam_validation_records for insert to authenticated with check ((select auth.uid())=owner_id);
create policy bam_records_update_own on public.bam_validation_records for update to authenticated using ((select auth.uid())=owner_id) with check ((select auth.uid())=owner_id);

create function public.bam_validation_scores_valid(value jsonb)
returns boolean language sql immutable set search_path = '' as $$
 select coalesce(bool_and(
  jsonb_typeof(r)='object' and r ? 'score' and length(r->>'testId')>0
  and r->>'status' in ('pending','done','na','blocked')
  and case when r->'score'='null'::jsonb then true
    when jsonb_typeof(r->'score')='number' then (r->>'score')::numeric between 1 and 10 and trunc((r->>'score')::numeric)=(r->>'score')::numeric
    else false end
 ),true) from jsonb_array_elements(case when jsonb_typeof(value)='array' then value else '[]'::jsonb end) r
$$;
alter table public.bam_validation_records add constraint bam_scores_valid check (id='programme-settings' or public.bam_validation_scores_valid(payload->'results'));

