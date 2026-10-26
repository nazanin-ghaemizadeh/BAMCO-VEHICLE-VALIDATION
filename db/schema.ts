import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const records = sqliteTable('validation_records', {
 id:text('id').primaryKey(), payload:text('payload').notNull(), updatedAt:text('updated_at').notNull()
});
