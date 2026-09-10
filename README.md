# CampusOS AI

AI-powered university workflow automation MVP for the Swarnandhra College Hackathon 2026.

## MVP demo

CampusOS turns a natural-language student request into a routed, trackable campus workflow.

**Demo workflow:** Bonafide Certificate

1. Student enters a request such as `I need a bonafide certificate for my internship.`
2. CampusOS Agent identifies the workflow, department and priority.
3. The application validates the request and creates a workflow.
4. The request is routed to Academic Administration.
5. Admin reviews the AI summary and approves/rejects.
6. Student sees the final status.

## Run locally

Requirements: Node.js 18.17+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Optional Gemini

Copy `.env.example` to `.env.local` and add a Gemini API key:

```bash
GEMINI_API_KEY=your_key
```

Without a key, the demo intentionally uses a deterministic fallback so the judging flow still works.

## Production direction

The MVP is intentionally compact. Phase 2 can add multiple workflows, real authentication, role/department authorization, documents, notifications and persistent storage. Phase 3 can add audit trails, rate limiting, prompt-injection protection, queues, observability and scalable infrastructure.
