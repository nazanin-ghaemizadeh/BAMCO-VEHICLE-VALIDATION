'use client';
import React from 'react';
import {ExternalLink,MapPin} from 'lucide-react';
type L='fa'|'en'|'zh';
const names:Record<string,string>={Tehran:'تهران',Dizin:'دیزین',Sari:'ساری',Kerman:'کرمان',Shahdad:'شهداد',Bam:'بم',Zahedan:'زاهدان',Jiroft:'جیرفت',Yazd:'یزد',Qom:'قم',Firuzkuh:'فیروزکوه'};
export default function RouteMap({origin='Tehran',destination='Kerman',via,lang='fa',overview=false}:{origin?:string;destination?:string;via?:string;lang?:L;overview?:boolean;routeType?:string}){
 const local=origin===destination;
 const label=overview?{fa:'نقشه مسیرهای آزمون',en:'Test region map',zh:'试验区域地图'}[lang]:{fa:'نقشه مسیر روز',en:'Daily route map',zh:'每日路线地图'}[lang];
 const q=overview?'Iran':local?origin+', Iran':[origin,...(via?[via]:[]),destination].map(c=>c+', Iran').join(' to ');
 const url='https://maps.google.com/maps?'+new URLSearchParams({q,output:'embed',hl:lang,z:overview?'5':local?'12':'7'}).toString();
 const full=overview?'https://www.google.com/maps/search/?api=1&query=Iran':local?'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(origin+', Iran'):'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(origin+', Iran')+'&destination='+encodeURIComponent(destination+', Iran')+(via?'&waypoints='+encodeURIComponent(via+', Iran'):'')+'&travelmode=driving';
 return <section className="google-map"><div className="google-map-bar"><span><MapPin size={17}/>{label}</span><a href={full} target="_blank" rel="noreferrer">{{fa:'بازکردن نقشه',en:'Open map',zh:'打开地图'}[lang]}<ExternalLink size={15}/></a></div><iframe key={url} src={url} title={label} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/><p>{overview?{fa:'محدوده جغرافیایی آزمون‌ها در ایران',en:'Test regions in Iran',zh:'伊朗试验区域'}[lang]:local?{fa:'مسیر محلی پس از تأیید تیم آزمون تعیین می‌شود.',en:'The test team must confirm the local circuit.',zh:'本地试验路线由试验团队确认。'}[lang]:lang==='fa'?(names[origin]||origin)+' ← '+(names[destination]||destination):origin+' → '+destination}</p></section>
}
