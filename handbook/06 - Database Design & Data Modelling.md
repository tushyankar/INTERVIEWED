# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 06 --- Database Design & Data Modelling

Version: 1.0

------------------------------------------------------------------------

# Executive Summary

A well-designed database is the foundation of a reliable application.
This chapter documents the database architecture of INTERVIEWED,
explains the reasoning behind each entity, and establishes modelling
rules that future features must follow.

------------------------------------------------------------------------

# Learning Objectives

After completing this chapter you should understand:

-   Why PostgreSQL was selected.
-   How Prisma maps application models to database tables.
-   Entity relationships within INTERVIEWED.
-   Normalisation principles used in the schema.
-   How future features can extend the data model safely.

------------------------------------------------------------------------

# 1. Database Philosophy

The database should prioritise:

-   Data integrity
-   Referential consistency
-   Predictable migrations
-   Type safety
-   Performance
-   Extensibility

------------------------------------------------------------------------

# 2. Core Entities

The current MVP is centred around these entities:

-   User
-   Resume
-   Interview
-   Question
-   Response
-   Analytics
-   RefreshToken

Each entity represents a distinct business concept and should remain
focused on a single responsibility.

------------------------------------------------------------------------

# 3. High-Level ER Diagram

``` text
User
 │
 ├──── Resume
 │
 ├──── Interview
 │        │
 │        ├──── Question
 │                 │
 │                 └──── Response
 │
 ├──── Analytics
 │
 └──── RefreshToken
```

------------------------------------------------------------------------

# 4. Entity Responsibilities

## User

Stores identity, authentication credentials, and acts as the parent for
all user-owned resources.

## Resume

Represents an uploaded resume together with extracted text, AI analysis,
and processing state.

## Interview

Represents a generated interview session for a specific role and
difficulty.

## Question

Stores each interview question in the order it should be presented.

## Response

Stores the candidate's transcript, score, media references, and AI
feedback.

## Analytics

Maintains aggregate statistics such as interview count and average
score.

## RefreshToken

Allows secure refresh-token rotation and revocation.

------------------------------------------------------------------------

# 5. Relationships

-   One User → Many Interviews
-   One User → Many Refresh Tokens
-   One User → One Analytics Record
-   One User → One or Many Resumes (depending on project evolution)
-   One Interview → Many Questions
-   One Question → Many Responses (future-proofing)

------------------------------------------------------------------------

# 6. Prisma Workflow

Typical schema update process:

1.  Edit `schema.prisma`
2.  Run `npx prisma format`
3.  Run `npx prisma generate`
4.  Create a migration
5.  Apply migration
6.  Verify in Prisma Studio
7.  Run `npm run typecheck`

Never edit the generated Prisma client manually.

------------------------------------------------------------------------

# 7. Migration Strategy

Migration rules:

-   One logical change per migration.
-   Name migrations descriptively.
-   Test on development before pushing.
-   Never modify old migrations after they are committed.

Examples:

-   add_resume_status
-   create_interview_tables
-   add_ai_feedback

------------------------------------------------------------------------

# 8. Indexing Strategy

Indexes should be added where they improve query performance.

Typical candidates:

-   User email
-   Foreign keys
-   Interview status
-   Resume status

Avoid unnecessary indexes because they increase write cost.

------------------------------------------------------------------------

# 9. Validation Rules

Database constraints should complement application validation.

Examples:

-   Unique email addresses.
-   Required foreign keys.
-   Non-null timestamps.
-   Cascading deletes only where appropriate.

------------------------------------------------------------------------

# 10. Production Considerations

As the application grows, consider:

-   Read replicas
-   Connection pooling
-   Database backups
-   Monitoring slow queries
-   Archiving historical data

------------------------------------------------------------------------

# Definition of Done

-   [ ] Entities documented
-   [ ] Relationships defined
-   [ ] Migration strategy documented
-   [ ] Indexing guidelines established
-   [ ] Validation rules documented
-   [ ] Production considerations reviewed

------------------------------------------------------------------------

# Engineering Notes

A schema should evolve with business requirements rather than short-term
implementation convenience. Design for clarity first; optimise only when
measurements justify it.

------------------------------------------------------------------------

# Next Chapter

**Chapter 07 --- Authentication & Authorization Architecture**
