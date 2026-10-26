import React from 'react';
import {createRoot} from 'react-dom/client';
import App from '../app/page';
import '../app/globals.css';
// Anonymous operation stays on this device; existing cloud records remain untouched.
const key='bam-validation-device-v1';
async function transport(input:any,init:any={}){
 if(!String(input).startsWith('/api/'))return fetch(input,init);
 try{
 const state=JSON.parse(localStorage.getItem(key)||'{"records":[],"settings":null}');
 if(!init.method||init.method==='GET')return Response.json(state);
 const payload=JSON.parse(init.body||'{}');
 if(String(input)==='/api/settings')state.settings=payload;
 else {payload.updatedAt=new Date().toISOString();state.records=[payload,...state.records.filter((r:any)=>r.id!==payload.id)];}
 localStorage.setItem(key,JSON.stringify(state));
 return Response.json({ok:true,record:payload});
 }catch{return Response.json({error:'Device storage unavailable'},{status:503});}
}
createRoot(document.getElementById('root')!).render(<App transport={transport} assetBase="/BAMCO-VEHICLE-VALIDATION"/>);
