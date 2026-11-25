import {useState} from 'react';import {useSearchParams} from 'react-router-dom';import {BadgeCheck} from 'lucide-react';
import {useAsync} from '../../hooks.js';import {specialists,appointments,children,reviews} from '../../services/index.js';import {GOVS,SPECIALISTS} from '../../data/mock.js';
export default function Booking({s,onClose}){const [step,setStep]=useState(1);const [type,setType]=useState(s.online?'online':'inperson');const [date,setDate]=useState('');const [time,setTime]=useState('');
const days=[1,2,3,4,5,6,7].map(i=>new Date(Date.now()+i*864e5).toISOString().slice(0,10));
async function ok(){await appointments.book({specialistId:s.id,specName:s.name,type,date,time});setStep(5)}
return <div className="modal" onClick={onClose}><div className="card" style={{width:'min(480px,100%)'}} onClick={e=>e.stopPropagation()}><h3>حجز مع {s.name}</h3>
{step===1&&<><p>نوع الجلسة</p><div className="chips">{s.online&&<button className={type==='online'?'on':''} onClick={()=>setType('online')}>أونلاين</button>}{s.inperson&&<button className={type==='inperson'?'on':''} onClick={()=>setType('inperson')}>حضوري</button>}</div></>}
{step===2&&<div className="chips">{days.map(d=><button key={d} className={date===d?'on':''} onClick={()=>setDate(d)}>{d}</button>)}</div>}
{step===3&&<div className="chips">{s.slots.map(t=><button key={t} className={time===t?'on':''} onClick={()=>setTime(t)}>{t}</button>)}</div>}
{step===4&&<p>{s.name} · {type==='online'?'أونلاين':'حضوري'} · {date} {time} {s.price?' · '+s.price+' ج.م':''}</p>}
{step===5&&<p style={{color:'#176653',fontWeight:700}}>✓ تم الحجز بنجاح! تابعه من «مواعيدي».</p>}
<div style={{display:'flex',gap:8,marginTop:12}}>{step<5&&step>1&&<button className="btn o" onClick={()=>setStep(step-1)}>السابق</button>}
{step<4&&<button className="btn" disabled={(step===2&&!date)||(step===3&&!time)} onClick={()=>setStep(step+1)}>التالي</button>}{step===4&&<button className="btn" onClick={ok}>تأكيد</button>}<button className="btn o" onClick={onClose}>إغلاق</button></div></div></div>}
