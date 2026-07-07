# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 09 --- AI Integration & Provider Architecture

Version: 1.0

------------------------------------------------------------------------

# Executive Summary

Artificial Intelligence is the differentiating capability of
INTERVIEWED, but it must never become a tightly coupled dependency. The
platform is designed around an AI provider abstraction so that business
logic remains unchanged whether responses come from a mock
implementation, a local large language model through Ollama, or a hosted
provider in the future.

This chapter defines the architecture of the AI layer, provider
lifecycle, prompt engineering strategy, response contracts, timeout
handling, and operational considerations.

------------------------------------------------------------------------

# Learning Objectives

After this chapter you should understand:

-   Why AI is abstracted behind an interface
-   Provider responsibilities
-   Prompt lifecycle
-   Structured JSON outputs
-   Retry and timeout strategy
-   Background execution
-   Future migration paths

------------------------------------------------------------------------

# 1. Architectural Principles

The AI subsystem must satisfy these principles:

-   Provider independence
-   Deterministic interfaces
-   Observable execution
-   Graceful failure
-   Replaceability
-   Testability

Business services should never import vendor SDKs directly.

------------------------------------------------------------------------

# 2. High-Level Architecture

``` text
Resume Service
Interview Service
Feedback Service
        │
        ▼
 +--------------------+
 |   AIProvider       |
 +--------------------+
        │
 ┌──────┼───────────────┐
 │      │               │
 ▼      ▼               ▼
Mock  Ollama       OpenAI (future)
```

Only the provider implementation knows how to communicate with the
underlying model.

------------------------------------------------------------------------

# 3. AI Provider Contract

Every provider should expose a common interface.

Responsibilities:

-   Accept a prompt
-   Execute inference
-   Return text or structured JSON
-   Throw meaningful errors
-   Hide transport details

Consumers of the interface should not know whether the response came
from a local model or a cloud API.

------------------------------------------------------------------------

# 4. Prompt Lifecycle

``` text
Business Data
      │
Prompt Builder
      │
AI Provider
      │
LLM Response
      │
Response Validator
      │
Structured JSON
      │
Database
```

Prompt construction and response validation should be isolated from
application logic.

------------------------------------------------------------------------

# 5. Structured Output

Whenever possible, AI responses should be machine-readable.

Example fields:

-   summary
-   skills
-   strengths
-   weaknesses
-   confidence
-   recommendations

Validate responses before storing them.

------------------------------------------------------------------------

# 6. Timeout & Retry Strategy

Recommended behaviour:

-   Apply request timeouts.
-   Retry only transient failures.
-   Do not retry malformed prompts.
-   Record provider failures.
-   Return safe fallback responses.

Long-running inference should execute asynchronously whenever practical.

------------------------------------------------------------------------

# 7. Background Processing

Suitable background tasks include:

-   Resume analysis
-   Interview generation
-   Feedback generation
-   Analytics enrichment

Future queue technologies:

-   BullMQ
-   RabbitMQ
-   Redis Streams

------------------------------------------------------------------------

# 8. Logging & Observability

Capture:

-   Provider name
-   Model
-   Duration
-   Success or failure
-   Token usage (future)
-   Request identifiers

Never log secrets or sensitive user information.

------------------------------------------------------------------------

# 9. Security

-   Never expose API keys to clients.
-   Keep prompts server-side.
-   Validate model output.
-   Sanitize stored content.
-   Restrict provider configuration through environment variables.

------------------------------------------------------------------------

# 10. Roadmap

Current:

-   Mock provider
-   Ollama integration

Future:

-   OpenAI
-   Anthropic
-   Google Gemini
-   Azure OpenAI
-   Custom fine-tuned models
-   Routing across providers

------------------------------------------------------------------------

# Testing Checklist

-   [ ] Mock provider returns deterministic output
-   [ ] Provider timeout handled
-   [ ] Invalid JSON rejected
-   [ ] Background execution verified
-   [ ] Provider swap requires no service changes
-   [ ] Errors logged consistently

------------------------------------------------------------------------

# Engineering Notes

The AI layer should evolve independently of business modules. Treat AI
providers as infrastructure components rather than core application
logic. This separation keeps the platform maintainable as models, APIs,
and deployment strategies change.

------------------------------------------------------------------------

# Next Chapter

**Chapter 10 --- Interview Generation Engine**
