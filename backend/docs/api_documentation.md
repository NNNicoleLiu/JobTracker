# Job Tracker API Documentation

**Base URL:** `http://localhost:8000/api`  
**Version:** 1.0.0  
**Authentication:** JWT Bearer Token / Google OAuth

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Job Applications](#job-applications)
4. [Error Codes](#error-codes)

---

## Overview

The Job Tracker API allows users to manage their job applications. All protected endpoints require a valid JWT access token in the request header.

### Request Headers

| Header          | Value                   | Required             |
| --------------- | ----------------------- | -------------------- |
| `Content-Type`  | `application/json`      | Yes                  |
| `Authorization` | `Bearer <access_token>` | For protected routes |

### Token Lifetime

| Token         | Lifetime |
| ------------- | -------- |
| Access Token  | 3 hour   |
| Refresh Token | 14 days  |

---

## Authentication

### 1. Register User

Creates a new user account.

```
POST /auth/register/
```

**Authentication Required:** No

**Request Body:**

| Field       | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `name`      | string | Yes      | Full name of the user |
| `email`     | string | Yes      | Unique email address  |
| `password`  | string | Yes      | Minimum 8 characters  |
| `password2` | string | Yes      | Must match password   |

**Example Request:**

```json
POST /auth/register/
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "password2": "SecurePass123!"
}
```

**Example Response:** `201 Created`

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-01-22T10:30:00Z"
  },
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User registered successfully"
}
```

---

### 2. Login

Authenticates a user with email and password.

```
POST /auth/login/
```

**Authentication Required:** No

**Request Body:**

| Field      | Type   | Required | Description              |
| ---------- | ------ | -------- | ------------------------ |
| `email`    | string | Yes      | Registered email address |
| `password` | string | Yes      | User password            |

**Example Request:**

```json
POST /auth/login/
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Example Response:** `200 OK`

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-01-22T10:30:00Z"
  },
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

---

### 3. Google OAuth Login

Authenticates a user using a Google OAuth access token.

```
POST /auth/google/
```

**Authentication Required:** No

**Request Body:**

| Field          | Type   | Required | Description               |
| -------------- | ------ | -------- | ------------------------- |
| `access_token` | string | Yes      | Google OAuth access token |

**Example Request:**

```json
POST /auth/google/
{
  "access_token": "ya29.a0AfH6SMBxyz..."
}
```

**Example Response:** `200 OK`

```json
{
  "user": {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane@gmail.com",
    "created_at": "2025-01-22T11:00:00Z"
  },
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Google login successful"
}
```

---

### 4. Refresh Token

Generates a new access token using a valid refresh token.

```
POST /auth/token/refresh/
```

**Authentication Required:** No

**Request Body:**

| Field     | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| `refresh` | string | Yes      | Valid refresh token |

**Example Request:**

```json
POST /auth/token/refresh/
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Example Response:** `200 OK`

```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 5. Logout

Blacklists the refresh token to invalidate the session.

```
POST /auth/logout/
```

**Authentication Required:** Yes

**Request Body:**

| Field     | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| `refresh` | string | Yes      | Refresh token to blacklist |

**Example Request:**

```json
POST /auth/logout/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Example Response:** `200 OK`

```json
{
  "message": "Logout successful"
}
```

---

### 6. Get / Update Profile

Retrieves the authenticated user's profile.

```
GET  /auth/profile/
```

**Authentication Required:** Yes

**GET Example Request:**

```
GET /auth/profile/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**GET Example Response:** `200 OK`

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2025-01-22T10:30:00Z"
}
```

---

## Job Applications

All job application endpoints require authentication.

### Job Application Object

| Field        | Type     | Description                            |
| ------------ | -------- | -------------------------------------- |
| `id`         | integer  | Unique identifier                      |
| `company`    | string   | Company name                           |
| `position`   | string   | Job position/title                     |
| `status`     | string   | Application status (see Status Values) |
| `applied_at` | datetime | Date and time applied                  |
| `link`       | string   | URL of job posting                     |
| `comment`    | string   | Notes or comments                      |

### Status Values

| Value       | Description                        |
| ----------- | ---------------------------------- |
| `Applied`   | Application submitted              |
| `Interview` | Interview scheduled or in progress |
| `Offer`     | Job offer received                 |
| `Rejected`  | Application rejected               |
| `Withdrawn` | Application withdrawn by user      |

---

### 1. List All Job Applications

Returns all job applications for the authenticated user.

```
GET /jobs/
```

**Authentication Required:** Yes

**Query Parameters (optional):**

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| `status`  | string | Filter by status              |
| `search`  | string | Search by company or position |

**Example Request:**

```
GET /jobs/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Response:** `200 OK`

```json
[
  {
    "id": 1,
    "company": "Google",
    "position": "Software Engineer",
    "status": "Applied",
    "applied_at": "2025-01-20T09:00:00Z",
    "link": "https://careers.google.com/jobs/123",
    "comment": "Applied via referral"
  },
  {
    "id": 2,
    "company": "Meta",
    "position": "Frontend Developer",
    "status": "Interview",
    "applied_at": "2025-01-21T14:00:00Z",
    "link": "https://metacareers.com/jobs/456",
    "comment": "First round scheduled"
  }
]
```

---

### 2. Create Job Application

Creates a new job application for the authenticated user.

```
POST /jobs/
```

**Authentication Required:** Yes

**Request Body:**

| Field        | Type     | Required | Description               |
| ------------ | -------- | -------- | ------------------------- |
| `company`    | string   | Yes      | Company name              |
| `position`   | string   | Yes      | Job position/title        |
| `status`     | string   | No       | Default: `Applied`        |
| `applied_at` | datetime | No       | Default: current datetime |
| `link`       | string   | No       | URL of job posting        |
| `comment`    | string   | No       | Notes or comments         |

**Example Request:**

```json
POST /jobs/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "company": "Amazon",
  "position": "Full Stack Engineer",
  "status": "Applied",
  "applied_at": "2026-05-05",
  "link": "https://amazon.jobs/123",
  "comment": "Dream job!"
}
```

**Example Response:** `201 Created`

```json
{
  "id": 3,
  "company": "Amazon",
  "position": "Full Stack Engineer",
  "status": "Applied",
  "applied_at": "2026-05-05T10:45:00Z",
  "link": "https://amazon.jobs/123",
  "comment": "Dream job!"
}
```

---

### 3. Get Job Application

Retrieves a specific job application by ID.

```
GET /jobs/{id}/
```

**Authentication Required:** Yes

**URL Parameters:**

| Parameter | Type    | Description        |
| --------- | ------- | ------------------ |
| `id`      | integer | Job application ID |

**Example Request:**

```
GET /jobs/3/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Response:** `200 OK`

```json
{
  "id": 3,
  "company": "Amazon",
  "position": "Full Stack Engineer",
  "status": "Applied",
  "applied_at": "2025-01-22T10:45:00Z",
  "link": "https://amazon.jobs/123",
  "comment": "Dream job!"
}
```

---

### 4. Update Job Application

Updates an existing job application.

```
PUT   /jobs/{id}/
```

**Authentication Required:** Yes

**URL Parameters:**

| Parameter | Type    | Description        |
| --------- | ------- | ------------------ |
| `id`      | integer | Job application ID |

**Request Body:**

| Field      | Type   | Description        |
| ---------- | ------ | ------------------ |
| `company`  | string | Company name       |
| `position` | string | Job position/title |
| `status`   | string | Application status |
| `link`     | string | URL of job posting |
| `comment`  | string | Notes or comments  |

**Example Request:**

```json
PUT /jobs/3/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "company": "Amazon",
  "position": "Full Stack Engineer",
  "status": "Interview",
  "applied_at": "2025-01-22T10:45:00Z",
  "link": "https://amazon.jobs/123",
  "comment": "First round interview scheduled for next Monday"
}
```

**Example Response:** `200 OK`

```json
{
  "id": 3,
  "company": "Amazon",
  "position": "Full Stack Engineer",
  "status": "Interview",
  "applied_at": "2025-01-22T10:45:00Z",
  "link": "https://amazon.jobs/123",
  "comment": "First round interview scheduled for next Monday"
}
```

---

### 5. Delete Job Application

Deletes a specific job application by ID.

```
DELETE /jobs/{id}/
```

**Authentication Required:** Yes

**URL Parameters:**

| Parameter | Type    | Description        |
| --------- | ------- | ------------------ |
| `id`      | integer | Job application ID |

**Example Request:**

```
DELETE /jobs/3/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Response:** `204 No Content`

```
(Empty response body)
```

---

## Error Codes

### HTTP Status Codes

| Code  | Status                | Description                    |
| ----- | --------------------- | ------------------------------ |
| `200` | OK                    | Request successful             |
| `201` | Created               | Resource created successfully  |
| `204` | No Content            | Resource deleted successfully  |
| `400` | Bad Request           | Invalid request data           |
| `401` | Unauthorized          | Missing or invalid token       |
| `403` | Forbidden             | Not allowed to access resource |
| `404` | Not Found             | Resource not found             |
| `500` | Internal Server Error | Server error                   |

---

### Error Response Format

All error responses follow this format:

```json
{
  "error": "Error message here"
}
```

Or for validation errors:

```json
{
  "field_name": ["Error message for this field"]
}
```

---

### Common Errors

#### 400 Bad Request

```json
// Missing required fields
{
  "company": ["This field is required."],
  "position": ["This field is required."]
}

// Password mismatch
{
  "password": ["Password fields didn't match."]
}

// Invalid email
{
  "email": ["Enter a valid email address."]
}
```

#### 401 Unauthorized

```json
// Missing token
{
  "detail": "Authentication credentials were not provided."
}

// Expired token
{
  "detail": "Given token not valid for any token type",
  "code": "token_not_valid",
  "messages": [
    {
      "token_class": "AccessToken",
      "token_type": "access",
      "message": "Token is expired"
    }
  ]
}

// Invalid credentials
{
  "error": "Invalid email or password"
}
```

#### 403 Forbidden

```json
{
  "detail": "You do not have permission to perform this action."
}
```

#### 404 Not Found

```json
{
  "detail": "Not found."
}
```

---

## Endpoint Summary

### Authentication

| Method | Endpoint               | Description                | Auth |
| ------ | ---------------------- | -------------------------- | ---- |
| `POST` | `/auth/register/`      | Register new user          | No   |
| `POST` | `/auth/login/`         | Login with email/password  | No   |
| `POST` | `/auth/google/`        | Login with Google OAuth    | No   |
| `POST` | `/auth/token/refresh/` | Refresh access token       | No   |
| `POST` | `/auth/logout/`        | Logout and blacklist token | Yes  |
| `GET`  | `/auth/profile/`       | Get user profile           | Yes  |

### Job Applications

| Method   | Endpoint      | Description            | Auth |
| -------- | ------------- | ---------------------- | ---- |
| `GET`    | `/jobs/`      | List all applications  | Yes  |
| `POST`   | `/jobs/`      | Create new application | Yes  |
| `GET`    | `/jobs/{id}/` | Get application by ID  | Yes  |
| `PUT`    | `/jobs/{id}/` | Update application     | Yes  |
| `DELETE` | `/jobs/{id}/` | Delete application     | Yes  |
