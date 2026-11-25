export const AI_CONNECTED=false; // اجعلها true بعد ربط الـ AI لإخفاء التنبيه
export const SEV={mild:'خفيف',moderate:'متوسط',severe:'شديد'};export const fmt=d=>new Date(d).toLocaleDateString('ar-EG');
export const age=b=>b?Math.max(0,Math.floor((Date.now()-new Date(b))/31557600000)):'—';
export const TIPS={all:['تحدث مع طفلك بهدوء ودون استعجاله.','امنحه وقتًا كافيًا للتعبير.','استمع لما يقوله لا لطريقة نطقه.'],do:['خصص وقتًا يوميًا قصيرًا للحديث الهادئ','شجّعه دون ضغط'],dont:['لا تقاطعه أو تكمل كلماته','لا تحرجه أو تصحح كلامه باستمرار']};
