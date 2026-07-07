# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 00 --- Vision

Version: 1.0

------------------------------------------------------------------------

# 1. Introduction

Software projects often begin with an idea.

Most fail because the idea is never translated into a well-designed
engineering system.

**INTERVIEWED** is not simply another AI project.

It is an attempt to build a production-grade interview platform capable
of conducting realistic technical interviews while remaining modular
enough to support multiple AI providers, different interview formats,
recruiter dashboards, coding interviews, behavioural interviews,
analytics, and enterprise deployments.

This handbook exists for one reason:

> To document every engineering decision behind the platform so that any
> developer can understand not only **what** is being built, but **why**
> it is is built that way.

This document should become the primary source of truth for the project.

------------------------------------------------------------------------

# 2. What is INTERVIEWED?

INTERVIEWED is an AI-powered interview preparation platform.

Unlike conventional interview websites that simply display random
interview questions, INTERVIEWED analyses a candidate's resume,
understands their background, generates personalised interview
questions, records responses, evaluates performance, and produces
actionable feedback.

The long-term vision is to simulate the experience of interviewing with
an experienced software engineer.

------------------------------------------------------------------------

# 3. Why does INTERVIEWED exist?

## Generic Questions

Most interview-preparation platforms present identical questions to
every candidate regardless of their profile.

## Lack of Personalisation

Recruiters naturally tailor questions based on projects, technologies,
education, and experience. Traditional platforms rarely do.

## Weak Feedback

A simple score is insufficient. Candidates should receive detailed
feedback explaining strengths, weaknesses, missing concepts,
communication issues, and recommended improvements.

------------------------------------------------------------------------

# 4. Vision Statement

> To build a realistic AI-powered mock interview platform capable of
> preparing candidates for software engineering interviews through
> personalised questioning, intelligent evaluation, and continuous
> improvement.

------------------------------------------------------------------------

# 5. Long-Term Goals

-   Resume analysis
-   Personalised interview generation
-   Behavioural interviews
-   Coding interviews
-   Voice interviews
-   Video interviews
-   Recruiter dashboard
-   Analytics and progress tracking

------------------------------------------------------------------------

# 6. Product Philosophy

## Simplicity

Each module should have a single responsibility.

## Modularity

AI providers should be replaceable without affecting business logic.

Example:

Resume Service

↓

AI Provider Interface

↓

Mock Provider / Ollama / OpenAI / Future Providers

## Scalability

The architecture should support growth from hobby projects to production
deployments.

## Maintainability

Every architectural decision should prioritise readability and long-term
maintenance.

## Testability

Controllers, services, repositories, and utilities should all be
independently testable.

------------------------------------------------------------------------

# 7. Engineering Principles

-   Separation of Concerns
-   Dependency Inversion
-   Fail Gracefully
-   Developer Experience First
-   Clean Architecture
-   Secure by Default

------------------------------------------------------------------------

# 8. Success Criteria

The project will be considered successful when it can:

-   Authenticate users securely.
-   Parse and store resumes.
-   Generate personalised interview sessions.
-   Evaluate candidate responses.
-   Provide meaningful feedback.
-   Track interview history.
-   Support multiple AI providers.
-   Deploy reliably to production.

------------------------------------------------------------------------

# End of Chapter

Next:

**Chapter 01 --- Problem Statement**
