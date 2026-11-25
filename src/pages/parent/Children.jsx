import {useState,useRef} from 'react';import {NavLink,Outlet,useNavigate,useParams,useLocation,Link} from 'react-router-dom';
import {Home,Baby,Mic,History as H,Users,CalendarDays,Bot,LogOut,MessageCircle,Languages,Square,Printer,Bell,Settings as Cog} from 'lucide-react';
import {BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import {useLang} from '../../lang.jsx';import {useAsync} from '../../hooks.js';import {auth,children,assessments,audio,appointments,specialists,notifications,profile} from '../../services/index.js';import Chat from '../../components/chatbot/Chat.jsx';
import {SEV,AI_CONNECTED,fmt,age,TIPS} from '../../utils/format.js';
export function Children(){const [k,re]=useAsync(children.list);const [f,setF]=useState({gender:'ذكر'});const [er,setEr]=useState(false);const s=x=>e=>setF({...f,[x]:e.target.value});
async function add(e){e.preventDefault();if(!f.name||!f.birth){setEr(true);return}setEr(false);await children.add(f);setF({gender:'ذكر'});re()}
return <div><h1>أطفالي</h1><form className="card" onSubmit={add}><div className="grid"><label>الاسم<input value={f.name||''} onChange={s('name')}/></label><label>تاريخ الميلاد<input type="date" value={f.birth||''} onChange={s('birth')}/></label>
<label>الجنس<select value={f.gender} onChange={s('gender')}><option>ذكر</option><option>أنثى</option></select></label></div><label>ملاحظات<textarea value={f.notes||''} onChange={s('notes')}/></label>{er&&<p className="err">الاسم وتاريخ الميلاد مطلوبان</p>}<button className="btn">إضافة طفل</button></form>
<div className="grid" style={{marginTop:16}}>{!k?<div className="skel"/>:k.length===0?<p>لا يوجد أطفال بعد. أضف طفلك الأول.</p>:k.map(c=><div className="card" key={c.id}><h3>{c.name}</h3><p>{age(c.birth)} سنة · {c.gender}</p><p>{c.notes}</p>
<button className="btn o" onClick={async()=>{if(confirm('حذف الطفل؟')){await children.remove(c.id);re()}}}>حذف</button></div>)}</div></div>}
