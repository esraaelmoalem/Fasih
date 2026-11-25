import {useState,useRef} from 'react';import {NavLink,Outlet,useNavigate,useParams,useLocation,Link} from 'react-router-dom';
import {Home,Baby,Mic,History as H,Users,CalendarDays,Bot,LogOut,MessageCircle,Languages,Square,Printer,Bell,Settings as Cog} from 'lucide-react';
import {BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import {useLang} from '../../lang.jsx';import {useAsync} from '../../hooks.js';import {auth,children,assessments,audio,appointments,specialists,notifications,profile} from '../../services/index.js';import Chat from '../../components/chatbot/Chat.jsx';
import {SEV,AI_CONNECTED,fmt,age,TIPS} from '../../utils/format.js';
export function Overview(){const u=auth.current();const [k]=useAsync(children.list);const [a]=useAsync(assessments.list);
return <div><h1>أهلًا {u.name} 👋</h1><div className="grid"><div className="card"><h3>أطفالي</h3><b>{k?.length??'…'}</b></div><div className="card"><h3>التقييمات</h3><b>{a?.length??'…'}</b></div></div>
<p><Link className="btn" to="/app/assess">ابدأ تقييمًا جديدًا</Link></p></div>}
