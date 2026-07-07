# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 04 --- High-Level Software Architecture

Version: 1.0

------------------------------------------------------------------------

# Executive Summary

Architecture determines how a software system evolves over time. A good
architecture makes change inexpensive, encourages modularity, and
enables teams to work independently. This chapter defines the high-level
architecture for INTERVIEWED and establishes the rules every future
module must follow.

------------------------------------------------------------------------

# 1. Architectural Goals

The architecture should:

-   Support rapid feature development.
-   Keep business logic independent from frameworks.
-   Allow AI providers to be swapped.
-   Be testable.
-   Scale from local development to production.

------------------------------------------------------------------------

# 2. Architectural Style

INTERVIEWED adopts a layered, feature-oriented architecture.

    Client (React)
          │
    REST API
          │
    Express Router
          │
    Controller Layer
          │
    Service Layer
          │
    Repository Layer
          │
    Prisma ORM
          │
    PostgreSQL

Each layer has a single responsibility.

------------------------------------------------------------------------

# 3. Responsibilities

## Controllers

-   Receive HTTP requests.
-   Validate input.
-   Call services.
-   Return standardized responses.
-   Never contain business logic.

## Services

-   Implement business rules.
-   Coordinate repositories.
-   Call AI providers.
-   Trigger background jobs.

## Repositories

-   Perform database operations only.
-   Never validate requests.
-   Never call external APIs.

------------------------------------------------------------------------

# 4. Module Structure

    server/
    └── src/
        └── modules/
            ├── auth/
            ├── resume/
            ├── interview/
            ├── analytics/
            └── ai/

Each module should contain:

-   controllers
-   services
-   repositories
-   routes
-   validators
-   types

------------------------------------------------------------------------

# 5. Request Lifecycle

    Browser
       │
    React
       │
    Express Route
       │
    Controller
       │
    Service
       │
    Repository
       │
    Prisma
       │
    PostgreSQL

Responses return through the same path in reverse order.

------------------------------------------------------------------------

# 6. Error Handling

Adopt a centralized error strategy.

-   Validate early.
-   Throw domain-specific errors.
-   Convert errors into consistent API responses.
-   Log unexpected failures.

------------------------------------------------------------------------

# 7. Background Processing

Long-running tasks such as AI analysis should execute asynchronously.

Examples:

-   Resume analysis
-   Interview generation
-   AI evaluation

The API should acknowledge the request quickly while background workers
continue processing.

------------------------------------------------------------------------

# 8. AI Provider Abstraction

    Resume Service
          │
    AIProvider Interface
          │
    ├── MockProvider
    ├── OllamaProvider
    └── OpenAIProvider

Business logic depends only on the interface.

------------------------------------------------------------------------

# 9. Security Principles

-   Authentication before authorization.
-   Validate every request.
-   Never trust client input.
-   Protect secrets using environment variables.
-   Minimise data exposure.

------------------------------------------------------------------------

# 10. Scalability Strategy

Future improvements may include:

-   Redis caching
-   Queue workers
-   Object storage
-   Horizontal API scaling
-   Load balancing

The current architecture should not prevent these upgrades.

------------------------------------------------------------------------

# Chapter Checklist

-   [ ] Layered architecture defined
-   [ ] Module responsibilities documented
-   [ ] Request flow documented
-   [ ] Background processing strategy defined
-   [ ] AI abstraction documented
-   [ ] Security principles established

------------------------------------------------------------------------

# Next Chapter

**Chapter 05 --- Development Environment & Project Setup**
