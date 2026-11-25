import {useState,useRef} from 'react';import {NavLink,Outlet,useNavigate,useParams,useLocation,Link} from 'react-router-dom';
import {Home,Baby,Mic,History as H,Users,CalendarDays,Bot,LogOut,MessageCircle,Languages,Square,Printer,Bell,Settings as Cog} from 'lucide-react';
import {BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import {useLang} from '../../lang.jsx';import {useAsync} from '../../hooks.js';import {auth,children,assessments,audio,appointments,specialists,notifications,profile} from '../../services/index.js';import Chat from '../../components/chatbot/Chat.jsx';
import {SEV,AI_CONNECTED,fmt,age,TIPS} from '../../utils/format.js';
export function History(){const [a]=useAsync(assessments.list);const [k]=useAsync(children.list);
return <div><h1>سجل التقييمات</h1>{!a?<div className="skel"/>:a.length===0?<p>لا توجد تقييمات بعد.</p>:a.map(x=><Link to={'/app/results/'+x.id} className="card" style={{display:'block',marginBottom:8}} key={x.id}>{k?.find(c=>c.id===x.childId)?.name} · {fmt(x.date)} · {SEV[x.severity]}</Link>)}</div>}
