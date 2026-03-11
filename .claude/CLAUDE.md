# CLAUDE.md — Agent Guide & Project Reference

> This file describes the available AI agents, their roles, and when to use each one in the context of the **MageGuildWars** project.

---

## Language Policy

Respond in the same language the user writes in. Polish and English prompts are treated identically — the same quality of reasoning, the same thoroughness, the same output structure. Never switch languages mid-response unless explicitly asked.

---

## Product Specification

The detailed product description ready for implementation is located at:

**[../SPEC.md](../SPEC.md)**

SPEC.md contains:
- Product description and business goal
- Functional and non-functional requirements
- System architecture and technology stack
- Entity and data model definitions
- User flows and screens
- Acceptance criteria and Definition of Done (DoD)

**Before starting any task** — read SPEC.md to understand the product context and requirements. Every agent should anchor their decisions to the specification.

---

## Available Agents

### Agent Directory

| Agent | Emoji | Path | Domain |
|-------|-------|------|--------|
| UI Designer | 🎨 | `agents/design/design-ui-designer.md` | Visual design systems |
| UX Architect | 📐 | `agents/design/design-ux-architect.md` | Technical architecture & UX |
| UX Researcher | 🔬 | `agents/design/design-ux-researcher.md` | User research |
| Backend Architect | 🏗️ | `agents/engineering/engineering-backend-architect.md` | Backend systems & databases |
| Frontend Developer | 🖥️ | `agents/engineering/engineering-frontend-developer.md` | UI implementation & web |
| Security Engineer | 🔒 | `agents/engineering/engineering-security-engineer.md` | Application security |

---

## Agent Descriptions & When to Use Each

---

### 🎨 UI Designer
**File:** [agents/design/design-ui-designer.md](agents/design/design-ui-designer.md)

**Role:** Expert in visual design systems, component libraries, and interface creation. Produces consistent, accessible UI that reflects brand identity.

**Use when:**
- Designing new screens or views
- Creating or extending a component library (buttons, cards, forms, navigation)
- Defining design tokens: colors, typography, spacing, shadows
- Producing developer handoff specifications
- Implementing dark mode or a theming system
- Auditing WCAG AA accessibility compliance
- Building responsive layout frameworks

**Do not use when:** You need to write code — that is the Frontend Developer's role.

---

### 📐 UX Architect
**File:** [agents/design/design-ux-architect.md](agents/design/design-ux-architect.md)

**Role:** Technical architecture and UX specialist. Creates CSS foundations, layout systems, and translates product specifications into implementable technical structure.

**Use when:**
- Starting a new project and needing a CSS foundation (variables, grid, typography)
- Defining information architecture and content hierarchy
- Building a breakpoint system and responsive strategy
- Establishing API contracts and data schemas between system components
- Coordinating responsibilities across agents
- Writing technical handoff documentation for developers
- Building a light/dark/system theme toggle

**Typical scenario:** The first agent to run at the start of a new module, before the Frontend Developer begins implementation.

---

### 🔬 UX Researcher
**File:** [agents/design/design-ux-researcher.md](agents/design/design-ux-researcher.md)

**Role:** Expert in UX research, user behavior analysis, and usability testing. Delivers insights grounded in data, not assumptions.

**Use when:**
- Validating product assumptions before implementation
- Creating user personas based on empirical data
- Designing user journey maps and identifying pain points
- Planning usability testing sessions
- Making decisions that require evidence rather than intuition
- Assessing product-market fit or feature priorities
- Analyzing A/B test results or usage analytics

**Do not use when:** The task is purely technical and unrelated to user behavior.

---

### 🏗️ Backend Architect
**File:** [agents/engineering/engineering-backend-architect.md](agents/engineering/engineering-backend-architect.md)

**Role:** Senior backend architect specializing in scalable systems, database architecture, APIs, and cloud infrastructure.

**Use when:**
- Designing a database schema (tables, indexes, relations)
- Architecting REST APIs or GraphQL
- Designing microservices or event-driven systems
- Setting up message queues, WebSockets, or real-time updates
- Designing caching strategies (Redis, CDN)
- Planning data migrations or ETL pipelines
- Auditing query performance and optimizing for scale
- Designing backup, disaster recovery, and monitoring

**Success metrics:** API < 200ms (p95), uptime > 99.9%, DB queries < 100ms.

---

### 🖥️ Frontend Developer
**File:** [agents/engineering/engineering-frontend-developer.md](agents/engineering/engineering-frontend-developer.md)

**Role:** Expert in modern web application implementation (React/Vue/Angular), performance optimization, and accessibility.

**Use when:**
- Implementing React/Vue/Angular components from design specifications
- Integrating the frontend with a backend API
- Optimizing Core Web Vitals (LCP, FID, CLS)
- Implementing state management (Redux, Zustand, Context)
- Building a responsive, mobile-first UI
- Writing unit and integration tests for components
- Implementing code splitting, lazy loading, bundle optimization
- Building PWA features or client-side WebSocket integrations

**Do not use when:** You need a visual design — that is the UI Designer's or UX Architect's role.

---

### 🔒 Security Engineer
**File:** [agents/engineering/engineering-security-engineer.md](agents/engineering/engineering-security-engineer.md)

**Role:** Application security expert — threat modeling, vulnerability assessment, secure code review, and security architecture.

**Use when:**
- Designing or reviewing authentication and authorization systems
- Implementing OAuth 2.0, OIDC, RBAC, or ABAC
- Running a STRIDE threat model before implementation
- Reviewing code for OWASP Top 10 / CWE Top 25 vulnerabilities
- Configuring security headers (CSP, HSTS, X-Frame-Options)
- Managing secrets and API keys (secrets management)
- Integrating SAST/DAST into a CI/CD pipeline
- Assessing cloud security configuration (IAM, network segmentation)
- Responding to a security incident or analyzing a vulnerability

**Rule:** Run this agent before any production deployment of features that handle user data or payments.

---

## Recommended Agent Sequences

### New product feature
```
UX Researcher → UI Designer → UX Architect → Backend Architect → Frontend Developer → Security Engineer
```

### New screen / view
```
UI Designer → UX Architect → Frontend Developer
```

### New API / endpoint
```
Backend Architect → Security Engineer → Frontend Developer
```

### Security audit
```
Security Engineer (standalone or after Backend Architect)
```

### User research / idea validation
```
UX Researcher (standalone)
```

---

## General Rules

1. **Always read SPEC.md before starting a task** — all decisions must be grounded in the product specification.
2. **One agent = one responsibility** — do not mix roles; if a task exceeds an agent's scope, hand it off to the appropriate one.
3. **Security Engineer is the final gate** before deploying any feature that touches user data.
4. **UX Architect lays the foundation** — run it first on new modules so the Frontend Developer has a solid base to build on.
5. **Document architectural decisions** in SPEC.md or dedicated files in `memory/` so knowledge persists across sessions.
