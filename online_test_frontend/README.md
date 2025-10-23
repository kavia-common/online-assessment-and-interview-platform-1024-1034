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
   - VITE_API_BASE_URL: Backend REST base URL
   - VITE_WS_URL: WebSocket base URL
   - VITE_USE_MOCKS: true|false to toggle axios mocks
   - VITE_APP_NAME: App display name

3) Run dev server
   npm run dev

4) Build
   npm run build

## Mock Mode
Set VITE_USE_MOCKS=true to intercept all axios requests and return canned responses from:
- src/api/mocks/auth.ts
- src/api/mocks/candidate.ts
- src/api/mocks/management.ts

WebSocket client also switches to echo/mock loopback when mocks are enabled.

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
