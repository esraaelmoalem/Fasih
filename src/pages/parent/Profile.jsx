import {useState,useRef} from 'react';import {NavLink,Outlet,useNavigate,useParams,useLocation,Link} from 'react-router-dom';
import {Home,Baby,Mic,History as H,Users,CalendarDays,Bot,LogOut,MessageCircle,Languages,Square,Printer,Bell,Settings as Cog} from 'lucide-react';
import {BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import {useLang} from '../../lang.jsx';import {useAsync} from '../../hooks.js';import {auth,children,assessments,audio,appointments,specialists,notifications,profile} from '../../services/index.js';import Chat from '../../components/chatbot/Chat.jsx';
import {SEV,AI_CONNECTED,fmt,age,TIPS} from '../../utils/format.js';
export function Profile(){const u=auth.current();const [name,setName]=useState(u.name);const [dark,setDark]=useState(document.body.classList.contains('dark'));const [msg,setMsg]=useState('');
return <div className="card"><h1>إعدادات الحساب</h1><label>الاسم<input value={name} onChange={e=>setName(e.target.value)}/></label>
<label><input type="checkbox" style={{width:'auto'}} checked={dark} onChange={e=>{setDark(e.target.checked);document.body.classList.toggle('dark',e.target.checked);localStorage.setItem('fasih:dark',e.target.checked?'1':'0')}}/> الوضع الداكن</label>
<p><button className="btn" disabled={!name.trim()} onClick={async()=>{await profile.update({name:name.trim()});setMsg('تم حفظ التغييرات')}}>حفظ</button> {msg}</p></div>}
