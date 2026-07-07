# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 10 --- Interview Generation Engine

Version: 1.0

------------------------------------------------------------------------

# Executive Summary

The Interview Generation Engine is the core capability of INTERVIEWED.
It converts a candidate's resume, selected role, target difficulty, and
future AI analysis into a structured interview session. The objective is
to generate interviews that are personalised, repeatable, extensible,
and independent of any specific AI provider.

------------------------------------------------------------------------

# Learning Objectives

After completing this chapter you should understand:

-   Interview generation workflow
-   Responsibilities of each layer
-   Data flow between Resume and Interview modules
-   AI integration points
-   Question persistence
-   Interview lifecycle
-   Future scalability considerations

------------------------------------------------------------------------

# 1. Business Objective

Every generated interview should reflect:

-   Candidate experience
-   Technologies used
-   Projects
-   Target role
-   Selected difficulty
-   Interview type (future)

The system should avoid generic question sets whenever resume
intelligence is available.

------------------------------------------------------------------------

# 2. High-Level Flow

``` text
User
 │
 ▼
Select Role & Difficulty
 │
 ▼
Resume Service
 │
 ▼
AI Provider
 │
 ▼
Question Generator
 │
 ▼
Interview Service
 │
 ▼
Interview Repository
 │
 ▼
PostgreSQL
```

------------------------------------------------------------------------

# 3. Responsibilities

## Controller

-   Validate request
-   Authenticate user
-   Delegate to service
-   Return interview identifier

## Service

-   Validate resume availability
-   Build AI prompt
-   Request questions
-   Persist interview
-   Persist questions

## Repository

-   Create interview
-   Create questions
-   Retrieve interview metadata

------------------------------------------------------------------------

# 4. Suggested Interview Lifecycle

``` text
CREATED
   │
IN_PROGRESS
   │
COMPLETED
   │
ARCHIVED (future)
```

------------------------------------------------------------------------

# 5. Question Categories

-   Resume-based
-   Project deep dive
-   Technical fundamentals
-   System design (future)
-   Behavioural
-   Coding (future)

Question ordering should progress from introductory topics to deeper
technical discussions.

------------------------------------------------------------------------

# 6. Validation Rules

Before generation:

-   Authenticated user
-   Resume exists
-   Resume processing complete
-   Valid role
-   Valid difficulty

Reject requests that violate business rules with consistent API
responses.

------------------------------------------------------------------------

# 7. Database Impact

Primary entities involved:

-   Resume
-   Interview
-   Question

Each interview owns its ordered question set.

------------------------------------------------------------------------

# 8. Error Handling

Typical failures:

-   Missing resume
-   AI unavailable
-   Invalid request
-   Database failure
-   Partial persistence

Design services so failures leave the database in a consistent state.

------------------------------------------------------------------------

# 9. Testing Strategy

-   Successful interview creation
-   Invalid role
-   Missing resume
-   AI provider failure
-   Repository failure
-   Authorization failure

------------------------------------------------------------------------

# 10. Future Enhancements

-   Adaptive follow-up questions
-   Multi-round interviews
-   Company-specific interview packs
-   Difficulty calibration
-   Interview templates
-   Collaborative interviewer agents

------------------------------------------------------------------------

# Definition of Done

-   [ ] Interview creation endpoint implemented
-   [ ] Questions persisted
-   [ ] Validation complete
-   [ ] Errors handled
-   [ ] Tests passing
-   [ ] Documentation updated

------------------------------------------------------------------------

# Engineering Notes

The Interview Generation Engine should remain independent of the
underlying AI implementation. Business logic should depend only on
provider interfaces and structured outputs so that new models can be
introduced with minimal application changes.

------------------------------------------------------------------------

# End of Volume I

The next volume transitions from foundational architecture into
implementation-focused backend engineering modules.
