# CodeSentinel — AI-Powered Code Review Assistant

An AI-driven code review tool that analyzes code for security vulnerabilities,
architectural improvements, and code quality issues using the Anthropic Claude API.

## Features

- Security analysis — detects SQL injection, broken authentication, hardcoded
  secrets, IDOR, XSS, and more with severity ratings (critical / high / medium / low)
- Architecture suggestions — identifies missing patterns, scalability bottlenecks,
  observability gaps, and structural improvements
- Code quality checks — flags DRY violations, missing error handling, poor naming,
  and complexity issues
- Scored overview — security, architecture, and quality each get a 0-100 score
- Multi-language — JavaScript, TypeScript, Python, Go, Java, Rust, C++, PHP, Ruby, SQL
- PR context — associate a review with a GitHub PR URL for traceability

## Quick start

# 1. Clone
git clone https://github.com/rahulreddyutd/codesentinel.git
cd codesentinel

# 2. Install
npm install

# 3. Configure
cp .env.example .env
# open .env and paste your Anthropic API key

# 4. Run
npm run dev
# open http://localhost:3000

## Environment variables

| Variable | Required | Description |
|---|---|---|
| VITE_ANTHROPIC_API_KEY | Yes | API key from console.anthropic.com |

## Project structure

codesentinel/
├── src/
│   ├── api/
│   │   └── claude.js
│   ├── components/
│   │   ├── TopBar.jsx
│   │   ├── CodePanel.jsx
│   │   ├── ReviewPanel.jsx
│   │   ├── IssueCard.jsx
│   │   ├── ArchCard.jsx
│   │   └── ScoreRing.jsx
│   ├── utils/
│   │   └── samples.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
├── .env.example
└── .gitignore

## How it works

1. Paste a code snippet or PR diff into the editor and select the language
2. Click Analyze code
3. Claude analyzes it and returns security issues, architecture suggestions,
   and quality improvements
4. Results are shown across four tabs with scores, affected code, and fix suggestions

## Production deployment

For production, never expose your API key in the browser bundle.
Use the Express proxy in server/index.js instead.

Run the server:
cd server
npm install
ANTHROPIC_API_KEY=sk-ant-... node index.js

Then update src/api/claude.js to call http://localhost:8080/api/review
instead of api.anthropic.com directly.

## Deploy to Vercel

1. Go to vercel.com and sign in with GitHub
2. Click New Project and select codesentinel
3. Add VITE_ANTHROPIC_API_KEY in environment variables
4. Click Deploy

## GitHub Actions bot

Add ANTHROPIC_API_KEY as a repository secret under:
Settings > Secrets and variables > Actions > New repository secret

Every pull request will then get an automatic AI review comment.

## License

MIT
