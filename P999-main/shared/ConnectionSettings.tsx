import React,{useState} from 'react';
import {getApiKey,getClient,getTextModel} from './gemini';
export function ConnectionSettings(){
 const [open,setOpen]=useState(false),[key,setKey]=useState(''),[model,setModel]=useState(()=>getTextModel()),[status,setStatus]=useState(''),[busy,setBusy]=useState(false);
 const save=()=>{if(key.trim())sessionStorage.setItem('multiverse_api_key',key.trim());localStorage.setItem('multiverse_text_model',model.trim());setKey('');setStatus('Đã lưu. Key chỉ được giữ trong phiên tab hiện tại.');};
 return <section style={{padding:12,background:'#151b32',color:'#eee',borderRadius:12,margin:8}}><button onClick={()=>setOpen(!open)}>⚙ Kết nối Gemini</button>{open&&<div style={{display:'grid',gap:10,paddingTop:12}}>
 <label>API key<input aria-label="API key" type="password" autoComplete="off" value={key} placeholder={getApiKey()?'Đã cấu hình · nhập để thay':'Nhập API key Gemini'} onChange={e=>setKey(e.target.value)} style={{display:'block',width:'100%',color:'#111'}}/></label>
 <label>Model văn bản<input aria-label="Model văn bản" value={model} onChange={e=>setModel(e.target.value)} style={{display:'block',width:'100%',color:'#111'}}/></label>
 <button onClick={save} disabled={busy||!model.trim()}>Lưu kết nối</button><button disabled={busy} onClick={async()=>{save();setBusy(true);try{const r=await getClient().models.generateContent({model:model.trim(),contents:'Reply OK.'});if(!r.text?.trim())throw Error('Phản hồi trống.');setStatus('Kết nối thành công.');}catch(e){setStatus(e instanceof Error?e.message:'Không kết nối được.');}finally{setBusy(false)}}}>{busy?'Đang kiểm tra…':'Kiểm tra kết nối'}</button>
 <button onClick={()=>{sessionStorage.removeItem('multiverse_api_key');setStatus('Đã xóa key nhập trong phiên.');}}>Xóa key đã nhập</button><p role="status">{status}</p></div>}</section>;
}
