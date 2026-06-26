# Online Course Platform - Team Workflow Guide

Welcome to the project! Since we are a team of 5, it is **CRITICAL** that we follow a proper Git workflow so nobody's code gets deleted or overwritten.

## Golden Rules
1. **NEVER push directly to the `main` or `master` branch.**
2. **ALWAYS pull the latest changes before you start working.**
3. **NEVER commit the `.env` file with real passwords.**

## Daily Workflow for Team Members

### 1. Start your day (Get latest code)
Before you write any code, download what your team did yesterday:
```bash
git checkout main
git pull origin main
```

### 2. Create a new branch for your task
Always create a new branch with your name or task name (e.g., `feature/login-ui` or `dammika/dashboard`).
```bash
git checkout -b <your-branch-name>
```

### 3. Write your code & Commit
```bash
git add .
git commit -m "Added the login button"
```

### 4. Push your branch to GitHub
```bash
git push -u origin <your-branch-name>
```

### 5. Merge safely (Pull Request)
Go to GitHub.com, and click **"Compare & pull request"**. This allows the team to review the code. If there are conflicts, GitHub will warn you, and you can fix them *without* losing anyone's code.

---

## How to Recover Lost Code?
If you make a mistake and want to undo your changes *before* committing:
```bash
git restore .
```

If you accidentally committed to the wrong branch or messed up, **DO NOT FORCE PUSH (`-f`)**. Ask the team for help, or use `git log` to find the commit hash and `git revert <commit-hash>`.
