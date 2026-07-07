# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 05 --- Development Environment & Project Setup

Version: 1.0

------------------------------------------------------------------------

# Executive Summary

This chapter establishes the official development environment for
INTERVIEWED. Every contributor should be able to clone the repository,
install dependencies, configure the environment, and run the complete
stack locally with predictable results.

The primary objective is reproducibility. If two developers follow this
guide, they should end up with identical development environments.

------------------------------------------------------------------------

# Learning Objectives

After completing this chapter you should understand:

-   Why the development environment is standardised.
-   How the repository is organised.
-   How backend and frontend communicate.
-   How PostgreSQL, Prisma and Redis fit together.
-   How to validate that the environment is working before writing any
    code.

------------------------------------------------------------------------

# 1. Development Philosophy

The project follows four principles.

## Consistency

Every developer should use the same tooling wherever practical.

## Automation

Repeated tasks should be executable using commands or scripts instead of
manual configuration.

## Isolation

Application code, configuration and runtime data should remain separate.

## Documentation First

Every setup step should be documented before introducing new
dependencies.

------------------------------------------------------------------------

# 2. Recommended Hardware

Minimum

-   Quad-core CPU
-   16 GB RAM
-   20 GB free disk space

Recommended

-   8-core CPU
-   32 GB RAM
-   SSD storage

------------------------------------------------------------------------

# 3. Required Software

Core Tools

-   Git
-   Node.js (LTS)
-   npm
-   PostgreSQL
-   Redis
-   Docker Desktop or Docker Engine
-   Visual Studio Code

Backend Libraries

-   Express
-   TypeScript
-   Prisma
-   JWT
-   Multer
-   Zod
-   bcrypt
-   dotenv

Frontend

-   React
-   Vite
-   Tailwind CSS
-   React Router
-   Axios

------------------------------------------------------------------------

# 4. Repository Structure

    INTERVIEWED/
    │
    ├── client/
    ├── server/
    ├── handbook/
    ├── docker/
    ├── .github/
    ├── README.md
    └── .gitignore

Purpose of each directory:

-   client → React application
-   server → REST API
-   handbook → Engineering documentation
-   docker → Container configuration
-   .github → CI/CD workflows

------------------------------------------------------------------------

# 5. Backend Bootstrap

Typical setup workflow:

1.  Clone repository.
2.  Install dependencies.
3.  Configure environment variables.
4.  Start PostgreSQL.
5.  Start Redis.
6.  Generate Prisma Client.
7.  Apply migrations.
8.  Run type checking.
9.  Start development server.

Verification checklist:

-   Health endpoint returns HTTP 200.
-   Database connection succeeds.
-   Prisma Studio opens.
-   Authentication endpoints respond.
-   No TypeScript errors.

------------------------------------------------------------------------

# 6. Environment Variables

Required variables include:

-   DATABASE_URL
-   REDIS_URL
-   JWT_SECRET
-   JWT_REFRESH_SECRET
-   CLIENT_URL
-   PORT

Future variables:

-   CLOUDINARY\_\*
-   AI provider keys
-   SMTP configuration

Never commit secrets to Git.

------------------------------------------------------------------------

# 7. Development Workflow

    Pull latest code
            │
    Create feature branch
            │
    Implement feature
            │
    Typecheck
            │
    Run server
            │
    Manual testing
            │
    Commit
            │
    Push
            │
    Pull Request

------------------------------------------------------------------------

# 8. Git Conventions

Recommended commit prefixes:

-   feat
-   fix
-   docs
-   refactor
-   chore
-   test

Examples:

    feat(auth): implement refresh tokens
    fix(resume): sanitize extracted PDF text
    docs(handbook): add development setup chapter

------------------------------------------------------------------------

# 9. Common Problems

## Database authentication

Verify DATABASE_URL and PostgreSQL user.

## Prisma migration failure

Confirm schema validity before running migrations.

## TypeScript errors

Run:

    npm run typecheck

before every commit.

## Upload failures

Confirm upload directory permissions and file size limits.

------------------------------------------------------------------------

# 10. Definition of Done

Before beginning feature development:

-   [ ] Repository cloned
-   [ ] Dependencies installed
-   [ ] Environment configured
-   [ ] Database running
-   [ ] Redis running
-   [ ] Prisma migrations applied
-   [ ] Typecheck passes
-   [ ] Development server starts
-   [ ] Health endpoint verified

------------------------------------------------------------------------

# Engineering Notes

A stable development environment reduces debugging time dramatically.
Most productivity issues in software projects stem from inconsistent
local setups rather than application code.

The remainder of this handbook assumes every prerequisite in this
chapter has been completed successfully.

------------------------------------------------------------------------

# Next Chapter

**Chapter 06 --- Database Design & Data Modelling**
