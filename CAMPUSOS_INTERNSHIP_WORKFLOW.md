# CampusOS AI — Internship Approval Workflow

## 1. Purpose

CampusOS AI is a role-based campus workflow system for moving a student's internship approval request from submission to final clearance without forcing the student to manually visit multiple offices.

For the current MVP, we focus on **one workflow only: Internship Approval and Clearance**.

The workflow has three demo user roles:

1. **Student** — submits and tracks the internship request.
2. **Placement Coordinator** — verifies the internship and forwards it to the student's department/HOD.
3. **Department HOD / Department Office** — verifies the request, records attendance duration, completes the required documentation, and sends the final outcome to the student.

The important AI/agentic layer is not merely a chatbot. The agent interprets the request, checks context, validates information, determines the next responsible authority, routes the request, tracks workflow state, prepares actions/documents, and communicates the outcome.

---

## 2. Main Use Case

### Student gets an internship

Example:

> "I got an internship at Google from 10 June to 10 August. I need college approval for the internship."

The student submits this through CampusOS.

CampusOS should turn the natural-language request into a structured workflow:

```text
Student Request
      ↓
AI Agent understands request
      ↓
Validate student + internship information
      ↓
Create Internship Approval Request
      ↓
Placement Coordinator
      ↓
Verify internship
      ↓
Forward / CC Department HOD
      ↓
Department HOD verifies
      ↓
Set approved internship duration / attendance period
      ↓
Prepare required documents
      ↓
Notify Student
      ↓
Final Clearance
```

---

# 3. Single Login + Three Roles

The application uses one login screen conceptually, but the logged-in account determines the user's role and dashboard.

## Demo Account 1 — Student

**Role:** Student  
**Name:** Vallabha Sai  
**Email:** `student@campusos.demo`  
**Password:** `student123`  
**Department:** CSE  
**Roll Number:** 23B81A0577  
**Semester:** 7  
**Mentor:** Assigned Faculty Mentor  

### Student interface

The student should see:

- Dashboard
- Personal profile
- Academic profile
- Account information
- Mentor information
- Department information
- Internship details
- Submit internship approval request
- Upload offer letter / supporting documents
- Current workflow status
- Timeline of actions
- Messages / notifications
- Final approved documents

### Student's main action

The student says what happened and submits the internship information.

Example:

> "I received an internship offer from Google. My internship is from 10 June to 10 August. I want college approval."

The agent extracts:

```text
Intent: INTERNSHIP_APPROVAL
Company: Google
Start Date: 10 June
End Date: 10 August
Student: Vallabha Sai
Department: CSE
Next Authority: Placement Cell
```

---

# 4. Demo Account 2 — Placement Coordinator

**Role:** Placement Coordinator  
**Name:** Priya Reddy  
**Email:** `placement@campusos.demo`  
**Password:** `placement123`  

### Placement interface

The Placement Cell should see:

- Dashboard
- Placement coordinator profile
- Pending internship requests
- Student information
- Company information
- Internship duration
- Uploaded offer letter
- AI verification summary
- Request history
- Approve / reject actions
- **CC / Forward to Department HOD** action
- Comments / reason field
- Notifications

### Placement request card example

```text
Request: INT-1024
Student: Vallabha Sai
Roll No: 23B81A0577
Department: CSE
Company: Google
Internship: Software Engineering Intern
Start: 10 June
End: 10 August
Status: Pending Placement Verification

AI Summary:
✓ Student profile matched
✓ Department identified
✓ Internship dates extracted
✓ Offer letter received
✓ Required information present

[Approve & CC HOD]   [Reject]
```

---

# 5. Demo Account 3 — Department HOD

**Role:** Department HOD  
**Name:** Dr. Bhavani Chittimalla  
**Email:** `hod@campusos.demo`  
**Password:** `hod123`  
**Department:** CSE

### HOD interface

The HOD should see:

- Department dashboard
- HOD profile
- Placement-verified internship requests
- Student details
- Company details
- Internship dates
- Placement verification status
- Supporting documents
- Attendance duration
- Approval / rejection controls
- Document generation / document package action
- Send mail / notification to student
- Request history

---

# 6. Complete Happy-Path Workflow — ACCEPTED

This is the primary demo flow.

## Step 1 — Student logs in

Student logs in using the student demo account.

The dashboard shows the student's profile and current requests.

The student opens **Internship Approval**.

### Student enters

```text
Company: Google
Role: Software Engineering Intern
Start Date: 10 June 2026
End Date: 10 August 2026
Mode: Hybrid
Location: Hyderabad
Purpose: Academic internship approval
```

Student uploads the offer letter.

Student clicks:

**Submit Internship Request**

---

# 7. Agentic Step 1 — Understand the Request

This is the first important agentic behavior.

Instead of requiring the student to know which department to contact, the agent interprets the student's natural language.

### Input

> "I got an internship at Google from June 10 to August 10. Please approve it."

### Agent output

```text
Intent: Internship Approval
Company: Google
Start: 10 June 2026
End: 10 August 2026
Student: Vallabha Sai
Department: CSE
Priority: Normal
Required Workflow: Internship Approval
Next Action: Placement Verification
```

### Why this is agentic

The student did not manually select the complete workflow. The agent interpreted the request and selected the appropriate workflow.

---

# 8. Agentic Step 2 — Check Student Context

The agent can use the student's profile as context.

It checks:

- Student identity
- Roll number
- Department
- Semester
- Mentor
- Existing internship request
- Previous request status

Example:

```text
Student Profile Found
✓ Roll number matched
✓ Department = CSE
✓ Semester = 7
✓ Student account active
✓ No conflicting active internship request
```

The agent then continues the workflow.

---

# 9. Agentic Step 3 — Validate Required Information

The agent checks whether the request has enough information to proceed.

Required information can include:

- Company
- Internship role
- Start date
- End date
- Offer letter
- Student identity
- Department

### If everything is present

The workflow continues automatically.

### If something is missing

The agent does not blindly forward the request.

Example:

> "Your internship end date is missing. Please provide the end date before I send this for verification."

Status:

`ACTION REQUIRED — STUDENT`

This is another useful agentic behavior because the system identifies the missing information and determines what must happen next.

---

# 10. Agentic Step 4 — Create Workflow

After validation, CampusOS creates a workflow ID.

Example:

```text
Request ID: INT-1024
Workflow: INTERNSHIP_APPROVAL
Current State: PLACEMENT_REVIEW
Assigned To: Placement Cell
Priority: NORMAL
```

The agent records the workflow state.

---

# 11. Agentic Step 5 — Route to Placement Cell

The agent determines that internship approval first needs Placement Cell verification.

```text
Student
  ↓
CampusOS Agent
  ↓
Placement Coordinator
```

The student sees:

```text
Submitted ✓
AI Validation ✓
Placement Verification → Pending
Department Verification → Waiting
Final Clearance → Waiting
```

---

# 12. Placement Coordinator — ACCEPT

Priya Reddy logs into the Placement Cell dashboard.

She sees:

```text
INT-1024
Vallabha Sai
CSE
Google
Software Engineering Intern
10 June — 10 August

AI Verification: Passed
```

She checks the offer letter and internship information.

She clicks:

**Approve & CC HOD**

---

# 13. Agentic Step 6 — Placement Approval

Once Placement approves, the agent updates the state.

```text
PLACEMENT_REVIEW
       ↓
PLACEMENT_APPROVED
       ↓
DEPARTMENT_REVIEW
```

The agent determines the student's department from the student profile.

For a CSE student:

```text
Department = CSE
HOD = Dr. Bhavani Chittimalla
```

The agent prepares the next action.

---

# 14. CC / Forward to HOD

The Placement Coordinator has a **CC / Forward to Department HOD** button.

When clicked:

```text
Placement Coordinator
        ↓
CampusOS Agent
        ↓
CSE Department HOD
```

The HOD receives the verified application.

Student status becomes:

`Placement Approved — Department Review Pending`

---

# 15. Department HOD — ACCEPT

Dr. Bhavani logs in.

She sees:

```text
Department: CSE

New Internship Request
----------------------
Student: Vallabha Sai
Company: Google
Role: Software Engineering Intern
Start: 10 June 2026
End: 10 August 2026
Placement: VERIFIED
```

She reviews the request.

She clicks:

**Approve Internship**

---

# 16. Agentic Step 7 — Determine Attendance Duration

After HOD approval, the agent can calculate or prepare the approved attendance period from the verified internship dates.

Example:

```text
Internship Start: 10 June
Internship End: 10 August
Approved Attendance Period: 10 June — 10 August
```

The agent can prepare the required record for the department office.

The important distinction is:

**AI prepares and orchestrates. The authorized HOD remains the decision-maker.**

---

# 17. Agentic Step 8 — Prepare Document Package

After approval, CampusOS prepares the student's final document package.

Example package:

```text
✓ Internship Approval Letter
✓ Approved Attendance Duration
✓ Department Approval Record
✓ Placement Verification Record
✓ Invoice / required financial document, if applicable
✓ Supporting internship information
```

The exact documents can depend on college policy.

The MVP can represent these as generated/demo documents without implementing a full document-management backend.

---

# 18. Agentic Step 9 — Notify Student

The agent prepares the final notification.

Example:

```text
Subject: Internship Approved — INT-1024

Dear Vallabha,

Your internship at Google has been verified by the Placement Cell
and approved by the CSE Department.

Approved Duration: 10 June 2026 – 10 August 2026

Your attendance and approval documents are now available in CampusOS.
```

Student status becomes:

`COMPLETED`

---

# 19. Final Student View — ACCEPTED

The student sees:

```text
Internship Approval

✓ Submitted
✓ AI Validated
✓ Placement Approved
✓ Department Approved
✓ Attendance Duration Assigned
✓ Documents Prepared
✓ Student Notified

Status: COMPLETED
```

This completes the happy path.

---

# 20. Rejection Flow — Student Request Rejected by Placement

Rejection is important because a real workflow must handle failure states, not only successful cases.

Example:

The student submits an internship request but the offer letter is invalid or the internship information does not satisfy Placement requirements.

Placement Coordinator sees:

```text
INT-1025
Student: Vallabha Sai
Company: Example Corp

Issue detected:
Offer letter does not contain required internship dates.
```

Placement clicks:

**Reject**

The coordinator must provide a reason.

Example:

> "Offer letter is missing the internship duration. Please upload a revised offer letter."

---

# 21. Agentic Rejection Handling — Placement

The agent updates the workflow:

```text
PLACEMENT_REVIEW
      ↓
PLACEMENT_REJECTED
      ↓
STUDENT_ACTION_REQUIRED
```

The agent prepares a student notification.

Student sees:

```text
Status: Rejected by Placement Cell

Reason:
Offer letter is missing the internship duration.

Action Required:
Upload a revised offer letter.

[Update Request]
```

This should **not** permanently end the request if the issue is fixable.

The student can correct the issue and resubmit.

---

# 22. Re-submission Flow

Student uploads the corrected offer letter.

Clicks:

**Resubmit**

Agent checks the updated information again.

```text
Previous State:
PLACEMENT_REJECTED

New State:
PLACEMENT_REVIEW
```

The request returns to the Placement queue.

This demonstrates that the agent can maintain workflow state rather than treating every submission as an unrelated chat.

---

# 23. Rejection Flow — Placement Sends to HOD but HOD Rejects

Another important case:

Placement approves the internship.

The request is forwarded to the HOD.

The HOD discovers a department-level problem.

Example:

> "The requested internship dates overlap with mandatory academic activity. Department approval cannot be granted for the submitted period."

HOD clicks:

**Reject**

and enters the reason.

---

# 24. Agentic HOD Rejection Handling

Workflow becomes:

```text
PLACEMENT_APPROVED
       ↓
DEPARTMENT_REVIEW
       ↓
DEPARTMENT_REJECTED
       ↓
STUDENT_ACTION_REQUIRED
```

Student receives:

```text
Status: Rejected by Department

Reason:
Internship period overlaps with mandatory academic activity.

Next Action:
Contact your mentor / update internship dates and resubmit.
```

The important point is that the agent routes the rejection back to the correct actor instead of leaving the student confused.

---

# 25. HOD Requests More Information

Not every failure should be a rejection.

The HOD can select:

**Request More Information**

Example:

> "Please provide the company's internship confirmation letter."

Workflow:

```text
DEPARTMENT_REVIEW
       ↓
MORE_INFORMATION_REQUIRED
       ↓
STUDENT_ACTION_REQUIRED
```

Student uploads the document.

Then:

```text
STUDENT_UPDATE
       ↓
DEPARTMENT_REVIEW
```

This is another strong agentic workflow example.

---

# 26. Placement Requests More Information

Placement may also request additional information.

Example:

```text
Missing:
Company HR contact
```

Placement selects:

**Request Information**

The agent sends the student a structured request:

> "Placement Cell needs the company HR contact details to continue verification."

The student updates the request.

The workflow automatically returns to Placement verification.

---

# 27. Student Cancels Request

The student may cancel before final approval.

Example:

> "I am no longer joining this internship."

Agent identifies:

```text
Intent: CANCEL_INTERNSHIP_REQUEST
Current State: PLACEMENT_REVIEW
```

If cancellation is allowed by policy:

```text
PLACEMENT_REVIEW
       ↓
CANCELLED_BY_STUDENT
```

Placement/HOD queues no longer require action.

---

# 28. Duplicate Request Detection

This is a valuable agentic use case.

Student accidentally submits the same internship twice.

The agent checks the student's existing requests.

Example:

```text
Existing Request:
INT-1024
Google
10 June – 10 August

New Request:
Google
10 June – 10 August
```

Agent response:

> "A similar internship request is already active. I have not created a duplicate request."

This prevents duplicate administrative work.

---

# 29. Wrong Department Routing

The student does not need to know the HOD's email address.

Example:

```text
Student Department: CSE
```

Agent determines:

```text
Department: CSE
Responsible Authority: CSE HOD
```

If the student profile says ECE, the agent routes to the ECE department instead.

This is a concrete example of **context-aware routing**.

---

# 30. Missing Information Flow

Student says:

> "I got an internship. Please approve it."

Agent identifies that essential information is missing.

Instead of sending an incomplete request to Placement, it asks:

```text
I can create the internship approval request, but I need:

1. Company name
2. Internship start date
3. Internship end date
4. Offer letter

Please provide the missing details.
```

Workflow state:

`DRAFT / INFORMATION_REQUIRED`

Once the student supplies the details, the agent continues.

---

# 31. Invalid Date / Data Validation

Example:

```text
Start Date: 10 August
End Date: 10 June
```

Agent should detect:

```text
Validation Error:
Internship end date occurs before start date.
```

The request should not be routed until corrected.

This is better than allowing bad data to reach the Placement Cell.

---

# 32. Agentic Flow — Complete State Machine

The workflow can be represented as:

```text
DRAFT
  ↓
SUBMITTED
  ↓
AI_VALIDATING
  ├── missing information → STUDENT_ACTION_REQUIRED
  ├── invalid data → STUDENT_ACTION_REQUIRED
  └── valid
        ↓
PLACEMENT_REVIEW
  ├── reject → PLACEMENT_REJECTED → STUDENT_ACTION_REQUIRED
  ├── more info → STUDENT_ACTION_REQUIRED
  └── approve
        ↓
DEPARTMENT_REVIEW
  ├── reject → DEPARTMENT_REJECTED → STUDENT_ACTION_REQUIRED
  ├── more info → STUDENT_ACTION_REQUIRED
  └── approve
        ↓
ATTENDANCE_PREPARATION
        ↓
DOCUMENT_PREPARATION
        ↓
STUDENT_NOTIFICATION
        ↓
COMPLETED
```

This state machine is the core of the application.

---

# 33. What Makes This Agentic?

A simple chatbot would only answer:

> "Your internship request has been submitted."

CampusOS should instead perform a chain of actions.

### Agent capabilities

```text
1. Understand
2. Extract
3. Validate
4. Check context
5. Decide next workflow step
6. Route
7. Wait for human approval
8. React to approval/rejection
9. Request missing information
10. Prepare next action
11. Generate/prepare documents
12. Notify
13. Track state
```

The human authorities remain responsible for decisions that require institutional approval.

The agent handles coordination and repetitive workflow work.

---

# 34. Human-in-the-Loop Design

This is especially important for a college workflow.

The AI should **not** autonomously approve an internship on behalf of the college.

Instead:

```text
AI Agent
   ↓
Prepares + validates + routes
   ↓
Authorized Human
   ↓
Approve / Reject / Request Information
   ↓
AI Agent
   ↓
Executes next workflow action
```

This gives the system both automation and accountability.

---

# 35. What the AI Agent Can Use as Tools

For a larger version of CampusOS, the agent can have tools such as:

```text
getStudentProfile()
getStudentDepartment()
getMentor()
checkExistingRequests()
validateInternshipDetails()
checkRequiredDocuments()
createWorkflow()
routeToPlacement()
routeToHOD()
updateWorkflowState()
requestMoreInformation()
prepareApprovalDocument()
prepareAttendanceRecord()
sendNotification()
```

For the hackathon MVP, these can be simulated with local data and API routes instead of building a full production backend.

---

# 36. Student Dashboard — Required Sections

```text
┌──────────────────────────────────────┐
│ CampusOS AI                          │
│ Vallabha Sai                         │
├──────────────────────────────────────┤
│ Dashboard                            │
│ Profile                              │
│ Account                              │
│ Academic Information                 │
│ Mentor                               │
│ Internship                           │
│ Requests                             │
│ Notifications                        │
└──────────────────────────────────────┘
```

Main dashboard:

```text
Good morning, Vallabha

My Internship
Google — Software Engineering Intern

Status: Department Approved

[View Workflow]

Recent Notifications
✓ Placement verification completed
✓ Department approval completed
✓ Documents ready
```

---

# 37. Placement Dashboard — Required Sections

```text
Placement Cell
Coordinator: Priya Reddy

Pending Requests: 7
Approved Today: 12
Rejected Today: 2

Pending Internship Applications
```

Each request has:

```text
Student
Company
Duration
Offer Letter
AI Summary
Validation Status

[Approve & CC HOD]
[Request Information]
[Reject]
```

---

# 38. HOD Dashboard — Required Sections

```text
CSE Department
HOD: Dr. Bhavani Chittimalla

Pending Department Approvals: 4
Approved Today: 6

Placement-Verified Internships
```

Each request has:

```text
Student
Company
Placement Status
Internship Duration
Documents

[Approve]
[Request Information]
[Reject]
```

After approval:

```text
Attendance Duration: 10 June – 10 August

Documents
✓ Approval Letter
✓ Attendance Record
✓ Department Record
✓ Invoice / required document

[Send to Student]
```

---

# 39. Demo Data

Use deterministic demo data so the hackathon presentation does not depend on external systems.

### Student

```text
Name: Vallabha Sai
Roll No: 23B81A0577
Department: CSE
Semester: 7
Mentor: Assigned Faculty Mentor
```

### Placement Coordinator

```text
Name: Priya Reddy
Role: Placement Coordinator
```

### HOD

```text
Name: Dr. Bhavani Chittimalla
Department: CSE
Role: Department HOD
```

### Internship

```text
Company: Google
Role: Software Engineering Intern
Start: 10 June 2026
End: 10 August 2026
Status: Pending / Approved depending on demo step
```

---

# 40. Recommended Demo Script

## Demo A — Successful Approval

1. Login as Student.
2. Show student profile.
3. Submit internship in natural language.
4. Show AI Agent Execution.
5. Show extracted company/dates/purpose.
6. Show request routed to Placement.
7. Logout.
8. Login as Placement Coordinator.
9. Open pending request.
10. Show AI verification summary.
11. Click **Approve & CC HOD**.
12. Show status changed to Department Review.
13. Logout.
14. Login as HOD.
15. Open verified request.
16. Click **Approve Internship**.
17. Show attendance duration/document package.
18. Click **Send to Student**.
19. Login as Student.
20. Show final `COMPLETED` timeline and documents.

## Demo B — Rejection

1. Submit another internship request.
2. Placement opens it.
3. Placement clicks Reject.
4. Enter rejection reason.
5. Agent sends reason to Student.
6. Student sees `Action Required`.
7. Student uploads corrected document.
8. Agent returns request to Placement.
9. Placement approves.
10. HOD reviews.
11. HOD can approve, reject, or request more information.

This demonstrates that CampusOS handles both the happy path and exceptions.

---

# 41. MVP vs Future Version

## Current MVP

Keep it simple:

- Single login screen
- Three demo roles
- Student profile
- Placement dashboard
- HOD dashboard
- One internship workflow
- AI classification/extraction
- Workflow state
- Approval
- Rejection
- Request-more-information state
- CC/forward action
- Attendance duration
- Demo document package
- Notifications
- In-memory/local demo data

## Future production version

Add:

- Real authentication
- Role-based access control
- PostgreSQL / Supabase
- Real college ERP integration
- Real email service
- File storage
- Digital signatures
- Document templates
- Audit logs
- SSO
- Notifications through email/SMS/app
- Faculty/mentor role
- Finance integration
- Calendar integration
- Analytics
- Agent observability
- Human approval policies
- Prompt-injection protection
- Background job queue

---

# 42. What NOT to Build for the First Demo

Do not waste hackathon time on:

- Kubernetes
- Microservices
- Complex authentication
- Payment gateway
- Full ERP integration
- 20 different campus workflows
- Large RAG pipeline
- Complex database architecture
- Real email infrastructure
- Production document signing

The winning MVP is the **visible end-to-end workflow**.

---

# 43. One-Line Product Explanation

> **CampusOS AI is an agentic campus workflow orchestrator that turns a student's natural-language request into a validated, routed, human-approved workflow and automatically carries the process through to final resolution.**

---

# 44. One-Line Internship Use Case

> **A student submits an internship once; CampusOS AI validates it, routes it to Placement, forwards it to the correct HOD after verification, handles approvals/rejections and missing information, prepares the final records, and notifies the student when the workflow is complete.**

---

# 45. Core Agentic Value

The student's problem is not that they cannot send an email.

The problem is that they do not know:

- whom to contact,
- which documents are required,
- what happens next,
- whether Placement approved it,
- whether the HOD received it,
- what information is missing,
- how long the process will take,
- and whether their final documents are ready.

CampusOS AI turns all of that into **one tracked workflow**.

```text
One Student Request
        ↓
One Workflow ID
        ↓
Multiple Authorized Actors
        ↓
AI-Orchestrated Handoffs
        ↓
Human Decisions
        ↓
Automatic Next Actions
        ↓
Final Student Resolution
```

That is the central concept of the CampusOS MVP.