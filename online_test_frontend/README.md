# Online Test Platform (Vue + Vite)

Modern, role-based frontend for candidates, admins, HR, and employees. Includes mockable API, WebSocket chat/monitoring, test-taking UX with anti-cheat utilities, and Ocean Professional theme.

## Features
- Role-based layouts and routes (candidate, admin, hr, employee)
- Test taking: MCQ, theory, simple code editor; timer, palette, controls, fullscreen, anti-cheat, proctoring banner
- Real-time chat/monitoring via WebSocket client
- Pinia stores for auth, user, tests, admin, hr, employee, chat
- Axios HTTP wrapper and optional mock mode using VITE_USE_MOCKS
- Ocean Professional theme (blue & amber accents)

## Getting Started
1) Install dependencies  
   npm install

2) Configure environment  
   Copy `.env.example` to `.env` and adjust values.
   - VITE_API_BASE_URL: Backend REST base URL (e.g., https://api.example.com)
   - VITE_WS_URL: WebSocket base URL (e.g., wss://ws.example.com)
   - VITE_USE_MOCKS: true|false to toggle axios and websocket mocks
   - VITE_APP_NAME: App display name

3) Run dev server  
   npm run dev

4) Build  
   npm run build

## API/WS Integration Guide

- Centralized endpoints in src/api/endpoints.ts
  - REST paths: grouped by domain (auth, candidate, admin, hr, employee)
  - WebSocket base and room URL: Endpoints.ws.base and Endpoints.ws.room(roomId)

- HTTP client in src/api/http.ts
  - Uses VITE_API_BASE_URL as base
  - Injects bearer Authorization header from Pinia auth store
  - On 401 responses, triggers auth.logout()

- WebSocket client in src/api/ws.ts
  - WSClient(url, mock?) creates a client; call .connect(), .on(), .send(), .close()
  - Uses Endpoints.ws.* for URLs
  - In mock mode (VITE_USE_MOCKS=true) or if connection fails, emits 'open' and echoes messages back

### Expected Backend REST Contracts (summary)
These routes are consumed by the frontend and mocked during development. Adapt as needed to your backend.

- Auth
  - POST /auth/login -> { token: string, user: { id, name, role } }
  - GET /auth/me -> { id, name, email?, role }
  - POST /auth/register -> 201 Created

- Candidate
  - GET /candidate/tests -> [{ id, title, duration }]
  - GET /candidate/tests/:testId/instructions -> { rules: string[], duration: number }
  - POST /candidate/tests/:testId/attempts -> { attemptId: string, startedAt: ISODate }
  - POST /candidate/attempts/:attemptId/answer -> 200 OK
  - POST /candidate/attempts/:attemptId/submit -> { score: number, status: string }
  - GET /candidate/attempts/:attemptId/summary -> { score, correct, total }
  - GET/PUT /candidate/profile
  - POST /candidate/resume
  - POST /candidate/questionnaire

- Admin
  - GET /admin/dashboard -> stats object
  - GET /admin/question-bank -> summary
  - GET /admin/users, GET /admin/reports, GET /admin/test-templates, etc.

- HR
  - GET /hr/dashboard -> stats
  - GET /hr/results -> [{ candidate, score }]
  - Various management endpoints (monitoring, time adjust, assignments, etc.)

- Employee
  - GET /employee/dashboard -> stats
  - GET /employee/reviews, /employee/interviews, etc.

### WebSocket Events (chat/monitoring)
- Connect to a room: ws = new WSClient(Endpoints.ws.room(roomId)).connect()
- Outgoing message payload shape: { text: string }
- Incoming messages may be:
  - { text: string, sender: string } (backend defined)
  - In mock mode: { echo: { text } } or { warning: string } when falling back

## Route Guards and Access
- Public routes: Login, Register, ForgotPassword
- Protected routes: candidate/admin/hr/employee dashboards and tools
- Guard behavior (router.beforeEach):
  - Redirect to / with redirect param if unauthenticated
  - Check meta.role vs. auth.user.role; if mismatch, redirect to the user’s dashboard
- Additional helper: src/utils/guards.ts (requireAuth) shows a reusable guard signature

## Mock Mode
Set VITE_USE_MOCKS=true to intercept all axios requests and return canned responses from:
- src/api/mocks/auth.ts
- src/api/mocks/candidate.ts
- src/api/mocks/management.ts

WebSocket client also switches to echo/mock loopback when mocks are enabled or if the WS connection fails in development.

## Structure Overview
- src/assets: base.css, theme.css (Ocean Professional theme), main.css
- src/api: http.ts (axios), endpoints.ts, ws.ts, mocks/
- src/layouts: DefaultLayout.vue, DashboardLayout.vue
- src/components/common: Sidebar, Topbar, Breadcrumbs, DataTable, Modal, FileUploader, AvatarUploader, Timer, FullScreenGuard, ProctoringBanner, ChatPanel, NotificationBell
- src/components/test: MCQQuestion, TheoryQuestion, CodeEditorQuestion, QuestionPalette, TestControls
- src/stores: auth, user, tests, admin, hr, employee, chat
- src/views/auth: Login, Register, ForgotPassword
- src/views/candidate: Dashboard, TestCatalog, TestInstructions, TestRunner, TestSummary, Profile, ResumeUpload, Questionnaire, InterviewDetails
- src/views/admin: Dashboard, QuestionBank, Users, Reports, TestTemplates, BackupRestore
- src/views/hr: Dashboard, TestSetup, CandidateImport, Monitoring, AdjustTime, Reappear, RecordingManager, Results, Assignments
- src/views/employee: Dashboard, Reviews, Interviews, Chat
- src/views/realtime: MonitorRoom, ChatRoom
- src/utils: guards, fullscreen, antiCheat, time, validators
- src/types: models, api

## Routes
Key entry routes:
- / -> Login (public)
- /candidate/*, /admin/*, /hr/*, /employee/* -> DashboardLayout with role guard
- /realtime/* -> role-based access for admin/hr/employee

## Notes
- This frontend assumes a separate backend. Use mock mode for local development without backend.
- Anti-cheat utilities provide basic protections (no copy/paste, tab switching warnings) and are meant as a foundation.
