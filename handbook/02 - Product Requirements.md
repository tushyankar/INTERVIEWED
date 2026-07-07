# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 02 --- Product Requirements Document (PRD)

Version: 1.0

------------------------------------------------------------------------

# Executive Summary

This Product Requirements Document (PRD) defines the scope of the
INTERVIEWED platform, its users, core features, technical objectives,
constraints, and success criteria. It acts as the bridge between the
product vision and engineering implementation.

------------------------------------------------------------------------

# 1. Product Vision

Build an AI-powered interview platform capable of delivering realistic,
personalised mock interviews using a candidate's resume, chosen role,
and performance history.

------------------------------------------------------------------------

# 2. Target Audience

## Primary

-   University students
-   Final-year engineering students
-   Recent graduates
-   Software engineers preparing for interviews

## Secondary

-   Recruiters
-   Universities
-   Bootcamps
-   Corporate training teams

------------------------------------------------------------------------

# 3. MVP Scope

The first production-ready release should support:

1.  User registration and authentication
2.  Resume upload and parsing
3.  Resume storage
4.  Interview creation
5.  AI or mock question generation
6.  Interview session management
7.  Response storage
8.  Basic analytics dashboard

Anything beyond these features should be considered an enhancement
unless required for platform stability.

------------------------------------------------------------------------

# 4. User Stories

### Candidate

-   Register an account.
-   Upload a resume.
-   Select a target role.
-   Generate an interview.
-   Complete the interview.
-   Review feedback.
-   Track improvement over time.

### Recruiter (Future)

-   Create interview templates.
-   Review submissions.
-   Compare candidate performance.

------------------------------------------------------------------------

# 5. Functional Requirements

## Authentication

-   Email/password registration
-   Login
-   Refresh tokens
-   Protected routes

## Resume Module

-   PDF upload
-   Text extraction
-   Resume persistence
-   Versioning support (future)

## Interview Module

-   Interview metadata
-   Question generation
-   Question ordering
-   Session lifecycle

## Analytics

-   Interview history
-   Average score
-   Progress tracking
-   Topic strengths and weaknesses

------------------------------------------------------------------------

# 6. Non-Functional Requirements

## Security

-   Password hashing
-   JWT authentication
-   Input validation
-   Secure file handling

## Performance

-   Background processing for expensive operations
-   Efficient database indexing
-   Responsive APIs

## Reliability

-   Structured logging
-   Graceful error handling
-   Retry-friendly architecture for external AI providers

## Maintainability

-   Clean Architecture
-   Repository pattern
-   Modular feature-based folders
-   Consistent code style

------------------------------------------------------------------------

# 7. Product Constraints

-   Local development should work without paid AI services.
-   AI providers must be swappable.
-   PostgreSQL is the primary datastore.
-   REST API is the initial integration layer.

------------------------------------------------------------------------

# 8. Milestones

## Phase 1

Environment setup.

## Phase 2

Backend architecture.

## Phase 3

Authentication.

## Phase 4

Resume processing.

## Phase 5

Resume intelligence.

## Phase 6

Interview generation.

## Phase 7

Interview session.

## Phase 8

Recording and transcription.

## Phase 9

AI evaluation.

## Phase 10

Dashboard and analytics.

## Phase 11--15

Deployment, optimisation, scaling, production hardening, and future
enhancements.

------------------------------------------------------------------------

# 9. Acceptance Criteria

The MVP is considered complete when:

-   Authentication is stable.
-   Resume upload is reliable.
-   Interviews can be generated.
-   Users can complete interview sessions.
-   Responses are stored.
-   Analytics are visible.
-   The application can be deployed using Docker.

------------------------------------------------------------------------

# Engineering Notes

Every feature described in this PRD should eventually map to:

-   Database models
-   API endpoints
-   Services
-   Controllers
-   Tests
-   Documentation

The remainder of this handbook expands each requirement into detailed
engineering specifications.

------------------------------------------------------------------------

# Next Chapter

**Chapter 03 --- Technology Stack & Engineering Decisions**
