'use client'

import { useState } from 'react'
import { Bot, CheckCircle2, Clock3, FileText, GraduationCap, LogIn, Mail, Send, ShieldCheck, UserRound, Users, XCircle } from 'lucide-react'

type Role = 'student' | 'placement' | 'hod'
type Status = 'Draft' | 'Submitted' | 'Placement Review' | 'Sent to HOD' | 'HOD Review' | 'Approved' | 'Rejected'

type InternshipRequest = {
  id: string
  student: string
  roll: string
  branch: string
  company: string
  role: string
  startDate: string
  endDate: string
  duration: string
  offerLetter: string
  status: Status
  placementNote: string
  hodNote: string
  attendance: string
  invoice: string
}

const DEMO_USERS: Record<Role, { name: string; email: string; password: string; title: string }> = {
  student: { name: 'Vallabha Sai Surishetty', email: 'student@campusos.demo', password: 'student123', title: 'Student' },
  placement: { name: 'Priya Reddy', email: 'placement@campusos.demo', password: 'placement123', title: 'Placement Coordinator' },
  hod: { name: 'Dr. Bhavani Chittimalla', email: 'hod@campusos.demo', password: 'hod123', title: 'CSE Department HOD' },
}

const initialRequest: InternshipRequest = {
  id: '#INT-1024', student: 'Vallabha Sai Surishetty', roll: '23B81A0577', branch: 'CSE',
  company: 'TechNova Systems', role: 'Software Engineering Intern', startDate: '15 Sep 2026', endDate: '15 Dec 2026', duration: '3 months',
  offerLetter: 'TechNova_Offer_Letter.pdf', status: 'Submitted', placementNote: '', hodNote: '', attendance: '', invoice: ''
}

export default function Home() {
  const [user, setUser] = useState<null | { role: Role; name: string; email: string; title: string }>(null)
  const [loginRole, setLoginRole] = useState<Role>('student')
  const [email, setEmail] = useState(DEMO_USERS.student.email)
  const [password, setPassword] = useState(DEMO_USERS.student.password)
  const [request, setRequest] = useState<InternshipRequest | null>(initialRequest)
  const [notice, setNotice] = useState('')
  const [agentLogs, setAgentLogs] = useState<string[]>([])

  function login() {
    const demo = DEMO_USERS[loginRole]
    if (email !== demo.email || password !== demo.password) {
      setNotice(`Demo login: ${demo.email} / ${demo.password}`)
      return
    }
    setUser({ role: loginRole, name: demo.name, email: demo.email, title: demo.title })
    setNotice('')
  }

  function runAgent(logs: string[]) {
    setAgentLogs(logs)
  }

  function submitInternship() {
    runAgent([
      'Agent understood: internship approval request',
      'Agent checked student profile and department',
      'Agent validated company, dates and offer letter',
      'Agent selected Placement Cell as first verifier',
      'Agent created workflow INT-1024',
      'Agent routed request to Placement Coordinator'
    ])
    setRequest(r => r ? { ...r, status: 'Placement Review' } : r)
  }

  function placementForward() {
    runAgent([
      'Placement Agent opened internship request',
      'Verified offer letter and internship company details',
      'Checked student eligibility context',
      'CC workflow: Department HOD',
      'Sent verified application to CSE Department HOD'
    ])
    setRequest(r => r ? { ...r, status: 'Sent to HOD', placementNote: 'Placement verified. Forwarded to CSE HOD for department approval.' } : r)
    setNotice('Application CC sent to Department HOD.')
  }

  function placementReject() {
    setRequest(r => r ? { ...r, status: 'Rejected', placementNote: 'Placement Cell rejected the request.' } : r)
    setNotice('Student has been notified of the rejection.')
  }

  function hodApprove() {
    runAgent([
      'Department Agent opened placement-verified request',
      'Checked internship dates against academic context',
      'Prepared attendance-duration record',
      'Generated department completion/invoice package',
      'Approved internship workflow',
      'Prepared student notification and documents'
    ])
    setRequest(r => r ? { ...r, status: 'Approved', hodNote: 'Department approved the internship.', attendance: '15 Sep 2026 – 15 Dec 2026 • 3 months', invoice: 'Internship_Attendance_Invoice_INT-1024.pdf' } : r)
    setNotice('Student notification and required department documents are ready.')
  }

  function hodReject() {
    setRequest(r => r ? { ...r, status: 'Rejected', hodNote: 'Department HOD rejected the internship request.' } : r)
    setNotice('Student has been notified of the department decision.')
  }

  if (!user) return <LoginScreen role={loginRole} setRole={r => { setLoginRole(r); setEmail(DEMO_USERS[r].email); setPassword(DEMO_USERS[r].password); setNotice('') }} email={email} setEmail={setEmail} password={password} setPassword={setPassword} login={login} notice={notice} />

  return <main className="min-h-screen bg-slate-50">
    <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white"><GraduationCap size={21}/></div><div><div className="font-bold">CampusOS <span className="text-blue-600">AI</span></div><div className="text-[11px] text-slate-500">Internship approval workflow</div></div></div>
        <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><div className="text-sm font-semibold">{user.name}</div><div className="text-xs text-slate-500">{user.title}</div></div><button onClick={()=>setUser(null)} className="rounded-xl border px-3 py-2 text-sm font-medium">Logout</button></div>
      </div>
    </header>

    <div className="mx-auto max-w-7xl px-5 py-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"><Bot size={13}/> Agentic campus workflow</div><h1 className="text-3xl font-bold tracking-tight">{user.title} Dashboard</h1><p className="mt-2 text-slate-500">{user.role === 'student' ? 'Submit and track your internship approval.' : user.role === 'placement' ? 'Verify student internship applications and CC them to departments.' : 'Review placement-verified internships and complete department approval.'}</p></div><RoleSwitcher current={user.role} onChange={r=>{setUser({ role:r, ...DEMO_USERS[r] }); setNotice('')}} /></div>

      {user.role === 'student' && <Student request={request} submit={submitInternship} logs={agentLogs}/>} 
      {user.role === 'placement' && <Placement request={request} forward={placementForward} reject={placementReject} logs={agentLogs}/>} 
      {user.role === 'hod' && <HOD request={request} approve={hodApprove} reject={hodReject} logs={agentLogs}/>} 

      {notice && <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">{notice}</div>}
      <footer className="mt-10 border-t py-5 text-xs text-slate-400 flex justify-between"><span>CampusOS AI • Hackathon MVP</span><span className="flex items-center gap-1"><ShieldCheck size={13}/> Three-role workflow demo</span></footer>
    </div>
  </main>
}

function LoginScreen({ role, setRole, email, setEmail, password, setPassword, login, notice }: any) {
  return <main className="min-h-screen bg-slate-950 px-5 py-10 text-slate-900"><div className="mx-auto max-w-md pt-10"><div className="mb-7 text-center text-white"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white text-slate-950"><GraduationCap/></div><h1 className="text-3xl font-bold">CampusOS AI</h1><p className="mt-2 text-slate-400">One login • three campus roles</p></div><div className="rounded-3xl bg-white p-6 shadow-2xl"><div className="mb-5 grid grid-cols-3 rounded-xl bg-slate-100 p-1">{(['student','placement','hod'] as Role[]).map(r=><button key={r} onClick={()=>setRole(r)} className={`rounded-lg px-2 py-2 text-xs font-semibold ${role===r?'bg-white shadow-sm':''}`}>{r==='student'?'Student':r==='placement'?'Placement':'HOD'}</button>)}</div><div className="mb-5 rounded-2xl border bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Demo account</div><div className="mt-2 text-sm font-semibold">{DEMO_USERS[role].name}</div><div className="text-xs text-slate-500">{DEMO_USERS[role].title}</div><div className="mt-2 font-mono text-xs text-slate-600">{DEMO_USERS[role].email}<br/>{DEMO_USERS[role].password}</div></div><label className="text-sm font-medium">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="mb-4 mt-2 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"/><label className="text-sm font-medium">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mb-5 mt-2 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"/><button onClick={login} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 font-semibold text-white"><LogIn size={17}/> Sign in</button>{notice&&<p className="mt-4 text-center text-xs text-red-600">{notice}</p>}</div></div></main>
}

function RoleSwitcher({ current, onChange }: { current: Role; onChange: (r: Role)=>void }) { return <div className="flex rounded-xl border bg-white p-1 text-xs"><button onClick={()=>onChange('student')} className={`px-3 py-2 rounded-lg ${current==='student'?'bg-slate-950 text-white':''}`}>Student</button><button onClick={()=>onChange('placement')} className={`px-3 py-2 rounded-lg ${current==='placement'?'bg-slate-950 text-white':''}`}>Placement</button><button onClick={()=>onChange('hod')} className={`px-3 py-2 rounded-lg ${current==='hod'?'bg-slate-950 text-white':''}`}>HOD</button></div> }

function Student({ request, submit, logs }: { request: InternshipRequest|null; submit:()=>void; logs:string[] }) { return <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]"><section className="rounded-3xl border bg-white p-6 shadow-sm"><div className="mb-6 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600"><UserRound/></div><div><h2 className="font-bold">Student Profile</h2><p className="text-sm text-slate-500">Your academic and mentor information</p></div></div><div className="grid gap-4 sm:grid-cols-2"><Info label="Full name" value="Vallabha Sai Surishetty"/><Info label="Roll number" value="23B81A0577"/><Info label="Program" value="B.Tech Computer Science & Engineering"/><Info label="Semester" value="7th Semester"/><Info label="Email" value="student@campusos.demo"/><Info label="Mentor" value="Dr. Bhavani Chittimalla"/><Info label="Department" value="Computer Science & Engineering"/><Info label="Academic status" value="Active student"/></div><div className="mt-7 border-t pt-6"><h2 className="font-bold">Internship Approval</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><Info label="Company" value="TechNova Systems"/><Info label="Role" value="Software Engineering Intern"/><Info label="Duration" value="15 Sep – 15 Dec 2026"/><Info label="Offer letter" value="TechNova_Offer_Letter.pdf"/></div><button disabled={!request || request.status!=='Submitted'} onClick={submit} className="mt-5 flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-40"><Send size={16}/>{request?.status==='Submitted'?'Submit for Approval':'Workflow Submitted'}</button></div></section><RequestTracker request={request}/>{logs.length>0&&<AgentLog logs={logs}/>}</div> }

function Placement({ request, forward, reject, logs }: { request: InternshipRequest|null; forward:()=>void; reject:()=>void; logs:string[] }) { const pending=request?.status==='Placement Review'; return <div className="grid gap-6 lg:grid-cols-[1fr_320px]"><section className="rounded-3xl border bg-white shadow-sm"><div className="border-b p-6"><div className="flex items-center gap-3"><Users className="text-blue-600"/><div><h2 className="font-bold">Placement Cell Queue</h2><p className="text-sm text-slate-500">Coordinator: Priya Reddy</p></div></div></div>{pending?<div className="p-6"><RequestDetails request={request}/><div className="mt-6 rounded-2xl bg-blue-50 p-4"><div className="text-xs font-bold uppercase tracking-wide text-blue-700">AI verification summary</div><p className="mt-2 text-sm leading-6 text-slate-700">The agent validated the student context, internship dates, company and offer letter. Placement Cell is the first human verification point.</p></div><div className="mt-5 flex gap-3"><button onClick={forward} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"><Mail size={17}/> CC to Department HOD</button><button onClick={reject} className="rounded-xl border px-4 py-3 text-sm font-semibold text-red-600"><XCircle size={17}/> Reject</button></div></div>:<EmptyQueue status={request?.status}/>}</section><aside className="space-y-6"><MiniMetric label="Coordinator" value="Priya Reddy"/><MiniMetric label="Pending requests" value={pending?'1':'0'}/><MiniMetric label="Verified today" value="8"/>{logs.length>0&&<AgentLog logs={logs}/>}</aside></div> }

function HOD({ request, approve, reject, logs }: { request: InternshipRequest|null; approve:()=>void; reject:()=>void; logs:string[] }) { const pending=request?.status==='Sent to HOD'; return <div className="grid gap-6 lg:grid-cols-[1fr_320px]"><section className="rounded-3xl border bg-white shadow-sm"><div className="border-b p-6"><div className="flex items-center gap-3"><ShieldCheck className="text-blue-600"/><div><h2 className="font-bold">CSE Department Office</h2><p className="text-sm text-slate-500">HOD: Dr. Bhavani Chittimalla</p></div></div></div>{pending?<div className="p-6"><RequestDetails request={request}/><div className="mt-5 rounded-2xl border p-4"><div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Department action</div><div className="mt-3 grid gap-3 sm:grid-cols-2"><Info label="Attendance duration" value="15 Sep 2026 – 15 Dec 2026"/><Info label="Required package" value="Attendance + invoice + approval"/></div></div><div className="mt-5 flex gap-3"><button onClick={approve} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"><CheckCircle2 size={17}/> Approve & Send</button><button onClick={reject} className="rounded-xl border px-4 py-3 text-sm font-semibold text-red-600"><XCircle size={17}/> Reject</button></div></div>:<EmptyQueue status={request?.status}/>}</section><aside className="space-y-6"><MiniMetric label="HOD" value="Dr. Bhavani"/><MiniMetric label="Awaiting review" value={pending?'1':'0'}/><MiniMetric label="Documents generated" value={request?.status==='Approved'?'1':'0'}/>{logs.length>0&&<AgentLog logs={logs}/>}</aside></div> }

function RequestDetails({request}:{request:InternshipRequest}){return <div className="rounded-2xl border p-5"><div className="flex items-start justify-between"><div><div className="text-xs font-semibold text-slate-400">{request.id}</div><h3 className="mt-1 text-xl font-bold">Internship Approval</h3></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{request.status}</span></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><Info label="Student" value={`${request.student} • ${request.roll}`}/><Info label="Branch" value={request.branch}/><Info label="Company" value={request.company}/><Info label="Role" value={request.role}/><Info label="Duration" value={request.duration}/><Info label="Offer letter" value={request.offerLetter}/></div></div>}

function RequestTracker({request}:{request:InternshipRequest|null}){const stages=['Submitted','Placement Review','Sent to HOD','Approved'];const index=request?stages.indexOf(request.status):0;return <section className="rounded-3xl border bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="font-bold">Internship Workflow</h2><span className="text-xs text-slate-500">{request?.status}</span></div><div className="space-y-4">{stages.map((s,i)=><div key={s} className="flex items-center gap-3"><div className={`grid h-7 w-7 place-items-center rounded-full ${i<=index?'bg-emerald-500 text-white':'bg-slate-100 text-slate-400'}`}>{i<=index?<CheckCircle2 size={15}/>:<Clock3 size={15}/>}</div><span className={i<=index?'font-medium':'text-slate-400'}>{s}</span></div>)}</div>{request?.status==='Approved'&&<div className="mt-6 rounded-2xl bg-emerald-50 p-4"><div className="font-semibold text-emerald-800">Internship cleared</div><div className="mt-2 text-sm text-emerald-700">Attendance: {request.attendance}</div><div className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-800"><FileText size={16}/> {request.invoice}</div><div className="mt-2 text-xs text-emerald-700">Approval mail sent by Department Office.</div></div>}</section>}

function AgentLog({logs}:{logs:string[]}){return <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-sm"><div className="mb-4 flex items-center gap-2 text-sm font-semibold"><Bot size={16}/> Agent Execution</div><div className="space-y-2">{logs.map((l,i)=><div key={i} className="flex gap-2 text-xs text-slate-300"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-400"/>{l}</div>)}</div></div>}
function EmptyQueue({status}:{status?:string}){return <div className="p-14 text-center"><CheckCircle2 className="mx-auto text-emerald-500" size={38}/><p className="mt-3 font-semibold">No pending request</p><p className="mt-1 text-sm text-slate-500">Current workflow status: {status || 'None'}</p></div>}
function MiniMetric({label,value}:{label:string,value:string}){return <div className="rounded-2xl border bg-white p-5"><div className="text-xs text-slate-400">{label}</div><div className="mt-1 font-bold">{value}</div></div>}
function Info({label,value}:{label:string,value:string}){return <div><div className="text-xs text-slate-400">{label}</div><div className="mt-1 text-sm font-medium leading-5">{value}</div></div>}
