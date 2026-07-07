# INTERVIEWED Engineering Handbook

# Volume I -- Foundations

## Chapter 07 --- Authentication & Authorization Architecture

Version: 1.0

------------------------------------------------------------------------

# Executive Summary

Authentication is the first security boundary of INTERVIEWED. This
chapter explains how identities are established, how sessions are
maintained, how protected resources are secured, and why the project
uses JWT access tokens together with refresh tokens.

Unlike implementation documentation, this chapter focuses on
architectural intent and engineering decisions so that future changes
preserve the security model.

------------------------------------------------------------------------

# Learning Objectives

After this chapter you should understand:

-   Authentication vs authorization
-   JWT lifecycle
-   Refresh-token rotation
-   Password hashing
-   Middleware responsibilities
-   Secure API design
-   Failure scenarios
-   Future authentication enhancements

------------------------------------------------------------------------

# 1. Security Goals

The authentication subsystem must:

-   Verify user identity.
-   Prevent unauthorized access.
-   Minimize credential exposure.
-   Support token revocation.
-   Scale to production workloads.

------------------------------------------------------------------------

# 2. Terminology

**Authentication** answers *Who are you?*

**Authorization** answers *What are you allowed to do?*

These concerns should remain separate throughout the codebase.

------------------------------------------------------------------------

# 3. High-Level Flow

``` text
Client
  │
Login Request
  │
Controller
  │
Authentication Service
  │
Password Verification
  │
Generate Access Token
Generate Refresh Token
  │
Database
  │
Response
```

------------------------------------------------------------------------

# 4. Access Token

Purpose:

-   Short-lived identity proof.
-   Sent with every protected request.

Typical contents:

-   User ID
-   Email
-   Issue time
-   Expiration

Access tokens should remain short-lived to reduce risk if compromised.

------------------------------------------------------------------------

# 5. Refresh Token

Purpose:

-   Issue new access tokens.
-   Allow persistent sessions.

Design rules:

-   Store securely.
-   Persist in the database.
-   Support revocation.
-   Expire after a defined period.

------------------------------------------------------------------------

# 6. Password Security

Passwords must never be stored in plaintext.

Recommended workflow:

1.  Receive password.
2.  Validate strength.
3.  Hash with bcrypt.
4.  Store hash.
5.  Compare hashes during login.

Never log passwords or password hashes.

------------------------------------------------------------------------

# 7. Middleware Responsibilities

Authentication middleware should:

-   Read Authorization header.
-   Verify JWT signature.
-   Validate expiration.
-   Attach authenticated user to the request.
-   Reject invalid requests with consistent responses.

Business logic belongs in services, not middleware.

------------------------------------------------------------------------

# 8. Folder Layout

``` text
server/src/modules/auth/
├── controllers/
├── services/
├── repositories/
├── routes/
├── validators/
├── middleware/
└── utils/
```

This separation improves testability and maintainability.

------------------------------------------------------------------------

# 9. Common Failure Cases

-   Expired token
-   Missing Authorization header
-   Invalid signature
-   Revoked refresh token
-   Unknown user
-   Incorrect password

Each case should return a predictable API response without leaking
sensitive information.

------------------------------------------------------------------------

# 10. Future Enhancements

Potential additions:

-   OAuth 2.0
-   Google Sign-In
-   GitHub authentication
-   Multi-factor authentication
-   Session management dashboard
-   Device tracking

------------------------------------------------------------------------

# Testing Checklist

-   [ ] Registration
-   [ ] Login
-   [ ] Refresh token
-   [ ] Logout
-   [ ] Invalid password
-   [ ] Expired token
-   [ ] Unauthorized endpoint access
-   [ ] Revoked refresh token

------------------------------------------------------------------------

# Engineering Notes

Authentication code changes should undergo careful review because they
affect every protected endpoint in the application. Prefer incremental
improvements over sweeping rewrites, and ensure security-related changes
are accompanied by tests.

------------------------------------------------------------------------

# Next Chapter

**Chapter 08 --- Resume Processing Architecture**
