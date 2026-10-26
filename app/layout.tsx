import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'BAM | Vehicle Validation',description:'Daily driveability and durability test programmes'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="fa" dir="rtl"><body>{children}</body></html>}
