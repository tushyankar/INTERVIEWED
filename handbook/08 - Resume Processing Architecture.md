# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 08 --- Resume Processing Architecture

Version: 1.0

------------------------------------------------------------------------

# Executive Summary

The Resume Processing module is the first intelligence pipeline in
INTERVIEWED. It transforms an uploaded PDF into structured application
data that later drives interview generation, analytics, and AI feedback.
The architecture separates file handling, text extraction, persistence,
and AI analysis so that each concern can evolve independently.

------------------------------------------------------------------------

# Learning Objectives

After completing this chapter you should understand:

-   End-to-end resume upload workflow
-   Controller → Service → Repository responsibilities
-   PDF extraction lifecycle
-   Resume status transitions
-   Background AI processing
-   Error handling and recovery
-   Future extensibility

------------------------------------------------------------------------

# 1. Module Responsibilities

The resume module is responsible for:

-   Accepting PDF uploads
-   Validating file type and size
-   Extracting text
-   Sanitising extracted content
-   Persisting resume metadata
-   Triggering AI analysis
-   Exposing resume information to downstream modules

It should **not** generate interview questions or evaluate candidates
directly.

------------------------------------------------------------------------

# 2. High-Level Architecture

``` text
Browser
   │
Multipart Upload
   │
Express Route
   │
Resume Controller
   │
Resume Service
   ├───────────────┐
   │               │
Repository      PDF Parser
   │               │
Prisma        Extracted Text
   │               │
PostgreSQL      AI Provider
        \         /
         \       /
        Resume Record
```

------------------------------------------------------------------------

# 3. Folder Structure

``` text
server/src/modules/resume/
├── controllers/
├── services/
├── repositories/
├── routes/
├── validators/
├── middleware/
└── types/
```

Supporting infrastructure:

``` text
server/uploads/resumes/
```

------------------------------------------------------------------------

# 4. Upload Pipeline

1.  User selects a PDF.
2.  Client submits multipart/form-data.
3.  Authentication middleware validates identity.
4.  Multer stores the uploaded file.
5.  Controller validates request.
6.  Service reads the PDF.
7.  Text is extracted and sanitised.
8.  Repository creates a Resume record.
9.  Background AI analysis begins.
10. Client receives an acknowledgement immediately.

------------------------------------------------------------------------

# 5. Resume Status Lifecycle

``` text
PENDING
   │
   ▼
PROCESSING
   │
   ├─────────────► FAILED
   │
   ▼
COMPLETED
```

Status values allow the frontend to show meaningful progress instead of
waiting for long-running operations.

------------------------------------------------------------------------

# 6. Data Stored

Each resume should record:

-   Original filename
-   Stored filename
-   MIME type
-   File size
-   Extracted text
-   AI analysis (when available)
-   Processing status
-   Owner
-   Created and updated timestamps

------------------------------------------------------------------------

# 7. Background Processing

AI analysis should run asynchronously.

Reasons:

-   Faster API responses
-   Better user experience
-   Easier retry strategies
-   Future compatibility with queues (BullMQ, RabbitMQ, etc.)

The service should update the database as analysis progresses.

------------------------------------------------------------------------

# 8. Error Handling

Typical failure scenarios:

-   Invalid PDF
-   Corrupted upload
-   Text extraction failure
-   Database failure
-   AI provider timeout
-   Unsupported file type

The module should log detailed errors internally while returning safe,
user-friendly responses.

------------------------------------------------------------------------

# 9. Security Considerations

-   Accept PDFs only.
-   Limit upload size.
-   Never trust client MIME type alone.
-   Sanitize extracted text.
-   Store uploads outside the public web root.
-   Ensure users can access only their own resumes.

------------------------------------------------------------------------

# 10. Future Enhancements

-   Multiple resumes per user
-   Resume version history
-   DOCX support
-   OCR for scanned resumes
-   Queue workers
-   Cloud object storage
-   Semantic embeddings
-   Skill extraction and confidence scoring

------------------------------------------------------------------------

# Testing Checklist

-   [ ] Upload valid PDF
-   [ ] Reject invalid file type
-   [ ] Reject oversized upload
-   [ ] Verify extracted text
-   [ ] Verify database record
-   [ ] Verify status transitions
-   [ ] Simulate AI failure
-   [ ] Confirm authorization rules

------------------------------------------------------------------------

# Engineering Notes

This module forms the foundation of every personalised feature in
INTERVIEWED. Future interview generation should rely on structured
resume analysis rather than reparsing raw documents repeatedly.

------------------------------------------------------------------------

# Next Chapter

**Chapter 09 --- AI Integration & Provider Architecture**
