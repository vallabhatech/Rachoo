'use client'

import { useMemo, useState } from 'react'
import { Bot, CheckCircle2, ChevronRight, Clock3, FileText, GraduationCap, LayoutDashboard, Send, ShieldCheck, Sparkles, UserRound, XCircle } from 'lucide-react'

type Request = { id: string; title: string; purpose: string; status: string; department: string; priority: string; createdAt: string }

const initialRequest: Request = { id: '#1024', title: 'Bonafide Certificate', purpose: 'Internship application', status: 'Pending Approval', department: 'Academic Administration', priority: 'Normal', createdAt: 'Just now' }

export default function Home() {
  const [role, setRole] = useState<'student'|'admin'>('student')
  const [text, setText] = useState('I need a bonafide certificate for my internship.')
  const [request, setRequest] = useState<Request | null>(initialRequest)
  const [processing, setProcessing] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [notice, setNotice] = useState('')

  const status = request?.status === 'Completed' ? 4 : request ? 3 : 0
  const steps = ['Submitted', 'AI Processed', 'Routed', request?.status === 'Completed' ? 'Approved' : 'Pending Approval', 'Completed']

  async function submitRequest() {
    if (!text.trim()) return
    setProcessing(true); setNotice(''); setLogs([])
    const fallback = { intent: 'BONAFIDE_CERTIFICATE', department: 'Academic Administration', priority: 'NORMAL', purpose: 'Internship application', next_action: 'CREATE_REQUEST' }
    try {
      const res = await fetch('/api/agent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
      const data = await res.json()
      const a = data.agent || fallback
      const events = ['Understanding request', `Identified: ${a.intent.replaceAll('_',' ')}`, 'Checked student profile', 'Validated required information', `Selected: ${a.department}`, 'Created workflow', 'Routed to Academic Administration']
      for (const e of events) { await new Promise(r => setTimeout(r, 180)); setLogs(v => [...v, e]) }
      setRequest({ id: '#1024', title: 'Bonafide Certificate', purpose: a.purpose || 'Internship application', status: 'Pending Approval', department: a.department || 'Academic Administration', priority: a.priority || 'Normal', createdAt: 'Just now' })
    } catch {
      for (const e of ['Understanding request','Identified: BONAFIDE CERTIFICATE','Checked student profile','Validated required information','Selected: Academic Administration','Created workflow','Routed to Academic Administration']) { await new Promise(r => setTimeout(r, 120)); setLogs(v => [...v, e]) }
      setRequest(initialRequest)
    } finally { setProcessing(false) }
  }

  function approve() { setRequest(r => r ? { ...r, status: 'Completed' } : r); setNotice('Request #1024 approved and completed. Student notification sent.') }
  function reject() { setRequest(r => r ? { ...r, status: 'Rejected' } : r); setNotice('Request #1024 rejected. Student notification sent.') }

  return <main className="min-h-screen">
    <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white"><GraduationCap size={21}/></div><div><div className="font-bold tracking-tight">CampusOS <span className="text-blue-600">AI</span></div><div className="text-[11px] text-slate-500">Campus workflow automation</div></div></div>
        <div className="flex rounded-xl border bg-slate-50 p-1 text-sm"><button onClick={()=>setRole('student')} className={`rounded-lg px-3 py-2 ${role==='student'?'bg-white shadow-sm font-semibold':''}`}>Student</button><button onClick={()=>setRole('admin')} className={`rounded-lg px-3 py-2 ${role==='admin'?'bg-white shadow-sm font-semibold':''}`}>Admin</button></div>
      </div>
    </header>

    <div className="mx-auto max-w-6xl px-5 py-8">
      <div className="mb-8 flex items-end justify-between"><div><div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"><Sparkles size={13}/> AI-powered campus operations</div><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{role==='student'?'Good morning, Vallabha.':'Academic Administration.'}</h1><p className="mt-2 text-slate-500">{role==='student'?'Tell CampusOS what you need. It will route the request for you.':'Review and resolve AI-routed campus requests.'}</p></div></div>

      {role==='student' ? <div className="grid gap-6 lg:grid-cols-[1.45fr_.85fr]">
        <section className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600"><Bot/></div><div><h2 className="font-bold">Campus AI Assistant</h2><p className="text-sm text-slate-500">Describe your request naturally.</p></div></div>
          <textarea value={text} onChange={e=>setText(e.target.value)} className="h-36 w-full resize-none rounded-2xl border bg-slate-50 p-4 outline-none ring-blue-500 focus:ring-2" placeholder="e.g. I need a bonafide certificate for my internship..."/>
          <div className="mt-4 flex items-center justify-between"><div className="text-xs text-slate-400">Try: “I need a bonafide certificate for my internship.”</div><button disabled={processing} onClick={submitRequest} className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"><Send size={16}/>{processing?'Processing...':'Submit Request'}</button></div>
          {(processing || logs.length>0) && <div className="mt-6 rounded-2xl border bg-slate-950 p-5 text-white"><div className="mb-4 flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-semibold"><Bot size={16}/> AI Agent Execution</span><span className="text-xs text-slate-400">{processing?'Running':'Complete'}</span></div><div className="space-y-2">{logs.map((l,i)=><div key={i} className="flex items-center gap-3 text-sm"><CheckCircle2 size={15} className="text-emerald-400"/><span className={i===logs.length-1?'text-white':'text-slate-300'}>{l}</span></div>)}</div></div>}
        </section>
        <section className="rounded-3xl border bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="font-bold">My Requests</h2><span className="rounded-full bg-slate-100 px-2 py-1 text-xs">1 active</span></div>{request ? <RequestCard request={request}/> : <div className="py-16 text-center text-sm text-slate-400">No requests yet.</div>}</section>
      </div> : <Admin request={request} approve={approve} reject={reject}/>} 

      {notice && <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"><CheckCircle2 size={18}/>{notice}</div>}

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-xs text-slate-400"><span>CampusOS AI • Hackathon MVP</span><span className="flex items-center gap-1"><ShieldCheck size={13}/> Role-based workflow demo</span></footer>
    </div>
  </main>
}

function RequestCard({ request }: { request: Request }) { return <div className="rounded-2xl border p-4"><div className="flex items-start justify-between"><div><div className="text-xs font-semibold text-slate-400">{request.id}</div><h3 className="mt-1 font-semibold">{request.title}</h3></div><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${request.status==='Completed'?'bg-emerald-50 text-emerald-700':request.status==='Rejected'?'bg-red-50 text-red-700':'bg-amber-50 text-amber-700'}`}>{request.status}</span></div><p className="mt-2 text-sm text-slate-500">{request.purpose} • {request.department}</p><div className="mt-5 space-y-3">{['Submitted','AI Processed','Routed',request.status==='Completed'?'Approved':'Pending Approval','Completed'].map((s,i)=><div key={s} className="flex items-center gap-3 text-sm"><div className={`grid h-6 w-6 place-items-center rounded-full ${i<=4 && ((request.status==='Completed'&&i<=4)||(request.status!=='Completed'&&i<3))?'bg-emerald-500 text-white':'bg-slate-100 text-slate-400'}`}>{i<3 || request.status==='Completed' ? <CheckCircle2 size={14}/>:<Clock3 size={14}/>}</div><span className={i<3 || request.status==='Completed'?'font-medium text-slate-700':'text-slate-400'}>{s}</span>{i<4&&<ChevronRight size={14} className="ml-auto text-slate-300"/>}</div>)}</div></div> }

function Admin({ request, approve, reject }: { request: Request|null, approve:()=>void, reject:()=>void }) { return <div className="grid gap-6 lg:grid-cols-[1fr_320px]"><section className="rounded-3xl border bg-white shadow-sm"><div className="border-b p-6"><div className="flex items-center gap-3"><LayoutDashboard className="text-blue-600"/><div><h2 className="font-bold">Pending Requests</h2><p className="text-sm text-slate-500">AI-routed requests requiring staff action.</p></div></div></div>{request && request.status!=='Rejected' && request.status!=='Completed' ? <div className="p-6"><div className="rounded-2xl border p-5"><div className="flex justify-between"><div><span className="text-xs font-semibold text-slate-400">{request.id}</span><h3 className="mt-1 text-xl font-bold">{request.title}</h3></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{request.priority}</span></div><div className="mt-5 grid gap-4 sm:grid-cols-3"><Info label="Student" value="Vallabha • CSE"/><Info label="Purpose" value={request.purpose}/><Info label="Department" value={request.department}/></div><div className="mt-5 rounded-2xl bg-slate-50 p-4"><div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">AI Summary</div><p className="text-sm leading-6 text-slate-700">Student requires a bonafide certificate for an internship application. Request has been validated and routed to Academic Administration.</p></div><div className="mt-5 flex gap-3"><button onClick={approve} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"><CheckCircle2 size={17}/> Approve</button><button onClick={reject} className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold text-red-600"><XCircle size={17}/> Reject</button></div></div></div>:<div className="p-12 text-center"><CheckCircle2 className="mx-auto text-emerald-500" size={38}/><p className="mt-3 font-semibold">No pending requests</p><p className="mt-1 text-sm text-slate-500">The queue is clear.</p></div>}</section><aside className="rounded-3xl border bg-white p-6 shadow-sm"><h3 className="font-bold">Workflow Health</h3><div className="mt-5 space-y-4"><Metric label="Requests today" value="12"/><Metric label="AI routed" value="12 / 12"/><Metric label="Avg. routing" value="1.8s"/><Metric label="Pending approval" value={request?.status==='Pending Approval'?'1':'0'}/></div></aside></div> }
function Info({label,value}:{label:string,value:string}){return <div><div className="text-xs text-slate-400">{label}</div><div className="mt-1 text-sm font-medium">{value}</div></div>}
function Metric({label,value}:{label:string,value:string}){return <div className="flex items-center justify-between border-b pb-3"><span className="text-sm text-slate-500">{label}</span><span className="font-bold">{value}</span></div>}
