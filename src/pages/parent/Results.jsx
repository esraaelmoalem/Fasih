import {useState,useRef} from 'react';import {NavLink,Outlet,useNavigate,useParams,useLocation,Link} from 'react-router-dom';
import {Home,Baby,Mic,History as H,Users,CalendarDays,Bot,LogOut,MessageCircle,Languages,Square,Printer,Bell,Settings as Cog} from 'lucide-react';
import {BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import {useLang} from '../../lang.jsx';import {useAsync} from '../../hooks.js';import {auth,children,assessments,audio,appointments,specialists,notifications,profile} from '../../services/index.js';import Chat from '../../components/chatbot/Chat.jsx';
import {SEV,AI_CONNECTED,fmt,age,TIPS} from '../../utils/format.js';
export function Results(){const {id}=useParams();const [all]=useAsync(assessments.list);const [kids]=useAsync(children.list);const [sp]=useAsync(()=>specialists.list({}));
if(!all||!kids)return <div className="skel"/>;const r=all.find(x=>x.id===id);if(!r)return <p>النتيجة غير موجودة.</p>;
const kid=kids.find(k=>k.id===r.childId);const prev=all.filter(x=>x.childId===r.childId&&x.date<r.date).pop();
const data=[['repetitions','التكرار'],['prolongations','الإطالة'],['blocks','التوقفات']].map(([k,n])=>({name:n,'الحالي':r[k],'السابق':prev?.[k]}));const best=sp?.[0];
return <div><div className="card"><h1>نتيجة {kid?.name}</h1><p>{fmt(r.date)} · <span className="badge">التصنيف: {SEV[r.severity]}</span></p>
<p>ملخص مبسّط: تُظهر النتيجة مقدار التكرار والإطالة والتوقفات في العينة، وتُراجع مع أخصائي لتحديد الخطوات المناسبة.</p>
<div style={{height:260}}><ResponsiveContainer><BarChart data={data}><XAxis dataKey="name"/><YAxis/><Tooltip/><Legend/><Bar dataKey="الحالي" fill="#176653"/>{prev&&<Bar dataKey="السابق" fill="#E9C96B"/>}</BarChart></ResponsiveContainer></div>
<button className="btn o noprint" onClick={()=>window.print()}><Printer size={16}/>تحميل التقرير (PDF)</button></div>
<div className="card" style={{marginTop:16}}><h2>كيف يمكنك مساعدة طفلك؟</h2><ul>{TIPS.all.map(x=><li key={x}>{x}</li>)}{r.severity!=='mild'&&<li>يُفضَّل حجز جلسة مع أخصائي تخاطب قريبًا لتحديد الخطوات المناسبة.</li>}</ul>
<div className="grid"><div><h3>افعل</h3><ul>{TIPS.do.map(x=><li key={x}>{x}</li>)}</ul></div><div><h3>تجنّب</h3><ul>{TIPS.dont.map(x=><li key={x}>{x}</li>)}</ul></div></div>
<p><b>خطوات مقترحة:</b> راجع النتيجة مع أخصائي، وكرّر التقييم بعد فترة لمتابعة التطور.</p>
{best&&<p>أخصائي مقترح (ترشيح إداري): <b>{best.name}</b> — {best.spec} <Link className="btn" to={'/app/specialists?book='+best.id}>احجز جلسة</Link></p>}
<p className="badge">النتائج الآلية لا تغني عن تقييم الأخصائي.</p>{!AI_CONNECTED&&<p className="badge note">الأرقام مولَّدة محليًا إلى حين ربط نظام التحليل.</p>}</div></div>}
