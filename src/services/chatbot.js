import {SPECIALISTS,GOVS} from '../data/mock.js';
// منطق قائم على قواعد. استبدل botReply باستدعاء AI API حقيقي (VITE_API_URL) دون تغيير الواجهة.
const NOTE='\n\nملاحظة: الترشيح إداري مبني على التخصص والخدمات المتاحة، وليس تشخيصًا طبيًا.';
export function recommend(q){const gov=GOVS.find(g=>q.includes(g));const online=/اونلاين|أونلاين|online|عن بعد/i.test(q);
const age=+(q.match(/(\d{1,2})\s*(سنة|سنوات|عام)/)||[])[1];
let l=SPECIALISTS.filter(s=>s.verified&&(!gov||s.gov===gov)&&(!online||s.online)&&(!age||(([a,b])=>age>=a&&age<=b)(s.ages.split('-').map(Number))));
if(!l.length)l=SPECIALISTS.filter(s=>s.online);return {list:l.sort((a,b)=>b.rating-a.rating).slice(0,3),gov,online,age}}
export async function botReply(q){await new Promise(r=>setTimeout(r,900));
if(/تشخيص|هل طفلي|درجة|شديد|يعاني من/.test(q))return {text:'لا أستطيع تشخيص الطفل أو تحديد درجة التلعثم من وصف الأعراض. التقييم الدقيق يتم عند أخصائي تخاطب مؤهل. يمكنني مساعدتك في الوصول لأخصائي مناسب.'};
if(/ألم|حرارة|تشنج|نزيف|طوارئ/.test(q))return {text:'هذا الأمر قد يحتاج مساعدة طبية مباشرة، يُفضّل التواصل مع طبيب أو أقرب جهة طبية.'};
if(/قارن|مقارنة/.test(q)){const r=recommend(q).list;return {text:'مقارنة بين أقرب الترشيحات:\n'+r.map(s=>`• ${s.name}: ${s.spec}، خبرة ${s.exp} سنة، تقييم ${s.rating}، ${s.online?'أونلاين':'حضوري'}`).join('\n')+NOTE,specialists:r}}
if(/أخصائي|اخصائي|حجز|احجز|رشح|اقترح|محافظة|أونلاين|اونلاين/.test(q)||GOVS.some(g=>q.includes(g))){const r=recommend(q);return {text:`رشحت لك ${r.list.length} أخصائيين موثقين${r.gov?' في '+r.gov:''}${r.online?' يقدمون جلسات أونلاين':''}. يمكنك فتح الملف أو الحجز مباشرة.`+NOTE,specialists:r.list}}
if(/نتيجة|تقييم|تحليل/.test(q))return {text:'تعرض النتيجة التكرار والإطالة والتوقفات، والتفسير النهائي دائمًا مع أخصائي مختص. يمكنك بدء تقييم جديد من قسم «تقييم جديد».'};
if(/تلعثم|طلاقة|ما هو/.test(q))return {text:'التلعثم اضطراب في طلاقة الكلام يظهر كتكرار أو إطالة أو توقف. هو شائع عند الأطفال، والدعم الهادئ والاستماع لهم يساعدان كثيرًا. أخصائي التخاطب هو من يحدد الخطوات المناسبة.'};
return {text:'يسعدني مساعدتك. يمكنك أن تسألني عن التلعثم، أو تشرح لي احتياجك لأرشح لك أخصائيًا (اذكر المحافظة وعمر الطفل وهل تفضّل أونلاين).'}}
