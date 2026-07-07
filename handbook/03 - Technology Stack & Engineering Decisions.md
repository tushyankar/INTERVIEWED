# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 03 --- Technology Stack & Engineering Decisions

Version: 1.0

------------------------------------------------------------------------

# Executive Summary

Selecting a technology stack is one of the earliest architectural
decisions in any software project. The chosen stack should optimise
developer productivity, maintainability, scalability, and long-term
flexibility rather than simply following trends.

This chapter explains why each technology in INTERVIEWED was selected,
what alternatives were considered, and how each component contributes to
the overall architecture.

------------------------------------------------------------------------

# 1. Design Philosophy

The platform follows these principles:

-   Modular design
-   Clean Architecture
-   Separation of Concerns
-   Feature-based folder structure
-   Replaceable AI providers
-   REST-first APIs
-   Docker-ready deployment

------------------------------------------------------------------------

# 2. Frontend Stack

## React

Chosen for its component model, large ecosystem, and maintainability.

Responsibilities:

-   Authentication
-   Resume upload
-   Interview workspace
-   Dashboard
-   Analytics

## TypeScript

Adds static typing, safer refactoring, and improved developer
experience.

## Tailwind CSS

Provides rapid UI development with consistent styling and low CSS
maintenance.

------------------------------------------------------------------------

# 3. Backend Stack

## Node.js

Efficient asynchronous runtime suitable for I/O-heavy APIs.

## Express.js

Lightweight framework that allows modular routing and middleware.

## TypeScript

Required across the backend for consistency and reliability.

------------------------------------------------------------------------

# 4. Database

## PostgreSQL

Selected because it provides:

-   ACID compliance
-   Strong relational modelling
-   JSON support
-   Mature tooling
-   Excellent Prisma integration

Alternatives considered:

-   MongoDB
-   MySQL
-   SQLite (development only)

------------------------------------------------------------------------

# 5. ORM

## Prisma

Reasons:

-   Type-safe queries
-   Automatic client generation
-   Schema migrations
-   Excellent TypeScript support

Typical workflow:

1.  Update schema.prisma
2.  Run prisma format
3.  Generate client
4.  Create migration
5.  Test queries

------------------------------------------------------------------------

# 6. Authentication

Current approach:

-   JWT Access Token
-   Refresh Token
-   Password hashing
-   Protected middleware

Future enhancements:

-   OAuth
-   SSO
-   Multi-factor authentication

------------------------------------------------------------------------

# 7. AI Layer

The AI layer is intentionally abstract.

    Resume Service
          │
    AI Provider Interface
          │
     ├── Mock Provider
     ├── Ollama Provider
     └── OpenAI Provider

Business logic must never depend directly on a specific provider.

------------------------------------------------------------------------

# 8. File Storage

Current:

-   Local storage

Future:

-   Cloudinary
-   AWS S3
-   Azure Blob Storage

------------------------------------------------------------------------

# 9. Development Tooling

-   Git
-   Docker
-   Postman / Bruno
-   Prisma Studio
-   ESLint
-   Prettier
-   npm

------------------------------------------------------------------------

# 10. Engineering Decisions

Every technology was selected because it satisfies one or more of:

-   Developer productivity
-   Long-term maintainability
-   Community support
-   Documentation quality
-   Ease of deployment
-   Scalability

Avoid introducing new dependencies without documenting: - Why it is
needed - Alternatives considered - Security implications - Maintenance
cost

------------------------------------------------------------------------

# Chapter Checklist

-   [ ] Technology stack finalised
-   [ ] Development tools installed
-   [ ] Database selected
-   [ ] Backend framework selected
-   [ ] Frontend framework selected
-   [ ] AI abstraction defined

------------------------------------------------------------------------

# Next Chapter

**Chapter 04 --- High-Level Software Architecture**
