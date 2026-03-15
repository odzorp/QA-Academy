# QA Academy - Cursor AI Agent Instructions

## Project Overview

- **Project Name**: QA Academy (Philip Odzor Portfolio)
- **Repository**: https://github.com/odzorp/QA-Academy
- **Live Site**: https://sqa-academy.netlify.app
- **Description**: Professional QA Testing Education platform with AI-powered learning assistants, tutorials on Playwright, Cypress, Selenium, API Testing, and CI/CD.

---

## Integrations

### GitHub

- **Repository URL**: https://github.com/odzorp/QA-Academy
- **Branch**: main
- **Status**: Already connected to Netlify for auto-deployment
- **Connection**: Any push to main triggers Netlify deployment

### Netlify

- **Site Name**: sqa-academy
- **Site URL**: https://sqa-academy.netlify.app
- **Functions Directory**: `netlify/functions/`
- **Netlify Config File**: `netlify.toml` (already configured)
- **Build Command**: None (static site)
- **Publish Directory**: `.` (root)

**To manage Netlify**:
1. Go to: https://app.netlify.com/sites/sqa-academy/overview
2. For environment variables: https://app.netlify.com/sites/sqa-academy/settings/env

### Cloudflare AI

- **AI Gateway Endpoint**: `https://gateway.ai.cloudflare.com/v1/79cb91ad5275bebd4abfb6e03985c197/netlify/compat/chat/completions`
- **Model**: `llama-3-70b-instruct`
- **Environment Variable Key**: `CLOUDFLARE_AI_TOKEN`
- **Token**: `iIHi6GT8JK_KEEZFu-jHLAGgGF3Ctu53BBVJldIv`

**IMPORTANT**: The `CLOUDFLARE_AI_TOKEN` environment variable must be set in the Netlify dashboard for AI agents to work.

**To set the environment variable in Netlify**:
1. Go to: https://app.netlify.com/sites/sqa-academy/settings/env
2. Add new variable:
   - Key: `CLOUDFLARE_AI_TOKEN`
   - Value: `iIHi6GT8JK_KEEZFu-jHLAGgGF3Ctu53BBVJldIv`
3. Trigger a new deployment

---

## Environment Variables

| Variable | Value | Location | Required |
|----------|-------|----------|----------|
| CLOUDFLARE_AI_TOKEN | `iIHi6GT8JK_KEEZFu-jHLAGgGF3Ctu53BBVJldIv` | Netlify Dashboard | Yes |

---

## Project Structure

```
philiportfolio/
├── index.html                    # Home page
├── about.html                    # About page
├── tutorials.html                # Tutorial listings
├── resources.html                # Resources page
├── contact.html                  # Contact page
├── quick-reference.html         # Quick reference guide
├── ai-agents.html               # AI Agents landing page
├── ai-code-review.html          # Code Review Agent
├── ai-quiz-tutor.html           # Quiz Tutor Agent
├── ai-api-tester.html           # API Tester Agent
├── ai-test-design.html          # Test Design Agent
├── ai-bdd-writer.html           # BDD Writer Agent
├── ai-performance.html          # Performance Testing Agent
├── tutorial-*.html              # 20 tutorial pages
├── netlify/
│   └── functions/
│       └── ai-agent.js          # AI agent backend function
├── css/
│   ├── styles.css               # Main styles
│   └── agent.css                # AI agent styles
├── js/
│   ├── main.js                  # Main JavaScript
│   └── quiz-engine.js           # Quiz system
├── assets/
│   ├── images/
│   └── certificates/
├── netlify.toml                 # Netlify configuration
└── AGENTS.md                   # This file
```

---

## Navigation Structure

Current main navigation (6 items):
- Home (`index.html`)
- About (`about.html`)
- Tutorials (`tutorials.html`)
- AI Agents (`ai-agents.html`)
- Resources (`resources.html`)
- Contact (`contact.html`)

---

## Tutorial Status

### Completed Tutorials (12)
| Tutorial | File |
|----------|------|
| Playwright Introduction | tutorial-playwright-intro.html |
| Cypress Basics | tutorial-cypress-intro.html |
| GitHub Actions CI/CD | tutorial-githubactions-intro.html |
| LoadMagic.AI Quickstart | tutorial-quickstart.html |
| LoadMagic.AI Basics | tutorial-basics.html |
| LoadMagic.AI Setup | tutorial-setup.html |
| LoadMagic.AI Architecture | tutorial-architecture.html |
| LoadMagic.AI CI/CD | tutorial-cicd.html |
| LoadMagic.AI Scaling | tutorial-scaling.html |
| LoadMagic.AI Enterprise | tutorial-enterprise.html |
| AI Agents | tutorial-agents.html |
| Correlation Engine | tutorial-correlation.html |

### Still "Coming Soon" (8 tutorials)
1. Locust Basics - tutorial-locust-basics.html
2. Locust Advanced - tutorial-locust-advanced.html
3. Locust CI/CD - tutorial-locust-ci-cd.html
4. Cucumber BDD - tutorial-cucumber-intro.html
5. Selenium WebDriver - tutorial-selenium-intro.html
6. Selenide - tutorial-selenide-intro.html
7. Agile & Scrum - tutorial-agile-scrum.html
8. Product Management - tutorial-product-mgmt.html

### Pending Tasks
- Complete content for the 8 "Coming Soon" tutorials above
- Update tutorials.html to remove "Coming Soon" badges once content is added
- Deploy updated site to Netlify

---

## AI Agents

6 AI-powered learning assistants are available:

1. **Code Review Agent** (`ai-code-review.html`)
   - Reviews Playwright, Cypress, Selenium test code
   - Provides actionable feedback

2. **Quiz Tutor Agent** (`ai-quiz-tutor.html`)
   - Explains quiz answers
   - Helps understand testing concepts

3. **API Tester Agent** (`ai-api-tester.html`)
   - Postman, REST Assured guidance
   - HTTP methods, authentication help

4. **Test Design Agent** (`ai-test-design.html`)
   - Test case creation
   - Test scenario design

5. **BDD Writer Agent** (`ai-bdd-writer.html`)
   - Gherkin scenario writing
   - Feature file organization

6. **Performance Testing Agent** (`ai-performance.html`)
   - JMeter, LoadMagic.AI guidance
   - Load testing concepts

### Backend

- **Function**: `netlify/functions/ai-agent.js`
- **Endpoint**: `/api/ai-agent` (via Netlify Functions)
- **API Call**: Frontend calls `fetch('/.netlify/functions/ai-agent')`

---

## Recent Changes

### Completed (March 2026)
- Added AI Agents to main navigation on all 5 main pages
- Fixed theming (dark/light mode) on AI agent pages
- Fixed Cloudflare AI Gateway endpoint configuration
- Commented out Sign Language sections (focus on QA only)
- Completed GitHub Actions CI/CD tutorial (was "Coming Soon")

### In Progress (March 2026)
- Locust tutorials (Basics, Advanced, CI/CD) - need content review
- 5 additional tutorials need completion (Cucumber, Selenium, Selenide, Agile/Scrum, Product Mgmt)

### Known Issues
- AI agents require `CLOUDFLARE_AI_TOKEN` environment variable to be set in Netlify

---

## How to Test

1. **Test Navigation**: Visit https://sqa-academy.netlify.app and verify all nav links work
2. **Test AI Agents**: 
   - Go to https://sqa-academy.netlify.app/ai-agents.html
   - Click any agent (e.g., Code Review)
   - Enter a prompt and submit
   - Should receive AI response if env var is set

---

## Common Tasks

### Update AI Agent Code
- Edit: `netlify/functions/ai-agent.js`
- Commit and push to trigger deployment

### Add New AI Agent
1. Create new HTML page (e.g., `ai-newagent.html`)
2. Add agent entry in `ai-agents.html`
3. Add agent type in `ai-agent.js` getSystemPrompt() function

### Add New Tutorial
1. Create new HTML page
2. Add entry in `tutorials.html`

### Change Environment Variable
1. Go to: https://app.netlify.com/sites/sqa-academy/settings/env
2. Update the variable
3. Trigger redeploy

---

## Deployment

**Automatic**: Every push to `main` branch triggers deployment
**Manual**: Go to Netlify dashboard → Deploys → Trigger deploy

---

## Credentials & Access

| Service | Access |
|---------|--------|
| GitHub | https://github.com/odzorp/QA-Academy |
| Netlify | https://app.netlify.com/sites/sqa-academy |
| Cloudflare AI | Endpoint configured, token provided |

---

*Last updated: March 2026*
