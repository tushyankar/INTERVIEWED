# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 01 --- Problem Statement

Version: 1.0

------------------------------------------------------------------------

# Executive Summary

This chapter defines the business problem that INTERVIEWED aims to solve
and establishes measurable objectives for the product. Every engineering
decision in later chapters should trace back to one or more problems
described here.

------------------------------------------------------------------------

# 1. Industry Context

Software engineering interviews have become increasingly specialised.
Candidates preparing for backend, frontend, machine learning, DevOps,
embedded systems, or cloud roles require different preparation
strategies. Existing interview platforms generally provide static
question banks with little or no personalisation.

Recruiters, however, conduct interviews dynamically. They explore
projects, challenge architectural decisions, ask follow-up questions,
and adapt based on the candidate's answers.

INTERVIEWED aims to narrow this gap.

------------------------------------------------------------------------

# 2. Problem Definition

The current interview preparation ecosystem has several shortcomings:

## Generic Question Banks

Every candidate often receives the same questions regardless of skills
or experience.

## Resume Blindness

Platforms rarely inspect a candidate's resume before creating interview
content.

## Lack of Adaptive Interviews

Questions are seldom influenced by previous responses.

## Minimal Feedback

Most systems return only a score instead of detailed coaching.

## No Long-Term Progress Tracking

Users cannot easily identify trends across multiple interview sessions.

------------------------------------------------------------------------

# 3. Target Users

## Primary Users

-   University students
-   Recent graduates
-   Software engineering interns
-   Job seekers
-   Career switchers

## Secondary Users

-   Recruiters
-   Hiring managers
-   Training organisations
-   Universities
-   Bootcamps

------------------------------------------------------------------------

# 4. Product Objectives

The platform should:

-   Personalise interviews using resume data.
-   Generate structured interview sessions.
-   Record candidate responses.
-   Evaluate performance consistently.
-   Track historical improvement.
-   Support multiple AI providers through a common abstraction.

------------------------------------------------------------------------

# 5. Functional Requirements

The MVP should include:

1.  User registration and login.
2.  Secure JWT authentication.
3.  Resume upload.
4.  Resume parsing.
5.  Interview creation.
6.  Question management.
7.  Response storage.
8.  Analytics dashboard.

Future releases may include coding interviews, recruiter portals, team
management, subscriptions, and enterprise authentication.

------------------------------------------------------------------------

# 6. Non-Functional Requirements

## Security

-   Password hashing
-   JWT authentication
-   Input validation
-   Secure file uploads

## Performance

-   Fast API responses
-   Background processing for long-running work
-   Database indexing

## Maintainability

-   Modular architecture
-   Repository pattern
-   Consistent coding standards

## Scalability

The system should support horizontal scaling and independent replacement
of AI providers.

------------------------------------------------------------------------

# 7. Success Metrics

Example measurable goals:

-   Resume upload success rate \> 99%.
-   Interview generation latency under acceptable development limits.
-   Zero data loss for completed interview sessions.
-   High automated test coverage for core modules.

------------------------------------------------------------------------

# 8. Engineering Implications

Because interview generation and evaluation are compute-intensive,
business logic must remain independent of any specific AI vendor.
Controllers should orchestrate requests only; services contain business
logic; repositories interact with the database.

------------------------------------------------------------------------

# Chapter Checklist

-   [ ] Business problem clearly defined
-   [ ] Target users identified
-   [ ] Functional requirements documented
-   [ ] Non-functional requirements documented
-   [ ] Success metrics established
-   [ ] Engineering constraints recorded

------------------------------------------------------------------------

# Next Chapter

**Chapter 02 --- Product Requirements**
