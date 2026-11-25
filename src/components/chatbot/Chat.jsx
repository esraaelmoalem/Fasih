import {useState,useRef,useEffect} from 'react';import {useNavigate} from 'react-router-dom';import {Send,Trash2,BadgeCheck} from 'lucide-react';
import {chat} from '../../services/index.js';import {load,save} from '../../services/db.js';
const WELCOME={from:'bot',text:'أهلًا بك، أنا مساعد فصيح. أساعدك في فهم خدمات المنصة والوصول لأخصائي تخاطب مناسب. لا أقدّم تشخيصًا طبيًا.'};
const SUG=['ما هو التلعثم؟','رشح لي أخصائي أونلاين في القاهرة','طفلي عمره 5 سنوات، أريد أخصائي','قارن بين الأخصائيين'];
export default function Chat(){const nav=useNavigate();const [msgs,setMsgs]=useState(()=>load('chat',[WELCOME]));const [txt,setTxt]=useState('');const [busy,setBusy]=useState(false);const [h,setH]=useState(false);const end=useRef();
useEffect(()=>{save('chat',msgs);end.current?.scrollIntoView({block:'nearest'})},[msgs,busy]);
async function send(x){const q=(x??txt).trim();if(!q||busy)return;setTxt('');const n=[...msgs,{from:'user',text:q}];setMsgs(n);setBusy(true);const r=await chat.reply(q,n);setBusy(false);setMsgs([...n,{from:'bot',...r}])}
return <div><div className="chat">{msgs.map((m,i)=><div key={i} className={'msg '+m.from}>{m.text}
{m.specialists?.map(s=><div key={s.id} className="card" style={{marginTop:8,color:'#263B34'}}><b>{s.name}</b> {s.verified&&<BadgeCheck size={16} color="#176653"/>}<div>{s.spec} · {s.gov} · ★{s.rating}</div>
<div style={{display:'flex',gap:6,marginTop:6}}><button className="btn o" onClick={()=>nav('/app/specialists?q='+s.name)}>عرض الملف</button><button className="btn" onClick={()=>nav('/app/specialists?book='+s.id)}>احجز</button></div></div>)}</div>)}
{busy&&<div className="msg bot dots">يكتب…</div>}<div ref={end}/></div>
<div className="chips" style={{margin:'8px 0'}}>{SUG.map(s=><button key={s} onClick={()=>send(s)}>{s}</button>)}</div>
<div style={{display:'flex',gap:6}}><input value={txt} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="اكتب رسالتك" style={{margin:0}}/>
<button className="btn" onClick={()=>send()} aria-label="إرسال"><Send size={16}/></button><button className="btn o" onClick={()=>{if(msgs.length>1)save('chatArchive',[...load('chatArchive',[]),{id:Date.now(),msgs}]);setMsgs([WELCOME])}} aria-label="مسح"><Trash2 size={16}/></button><button className="btn o" onClick={()=>setH(!h)}>السجل</button></div>{h&&<div style={{marginTop:8}}>{load('chatArchive',[]).length===0?<p>لا توجد محادثات سابقة.</p>:load('chatArchive',[]).map(c=><button key={c.id} className="btn o" style={{display:'block',margin:'4px 0'}} onClick={()=>{setMsgs(c.msgs);setH(false)}}>{c.msgs.find(m=>m.from==='user')?.text.slice(0,30)}</button>)}</div>}</div>}
