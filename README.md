# 📌 API Summary - Library Management System

This API provides a RESTful interface for managing books, authors, users, loans, and reviews in a library system. It supports CRUD operations with authentication for sensitive actions.

## 📚 Books API Documentation

### Get All Books
```http
GET /api/books
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of books per page (default: 10)
- `title` (optional): Search books by title (case-insensitive)
- `author` (optional): Search books by author (case-insensitive)
- `category` (optional): Filter books by category (case-insensitive)

**Response:**
```json
{
    "success": true,
    "books": [
        {
            "bookId": "string",
            "title": "string",
            "author": "string",
            "category": "string",
            "description": "string",
            "price": "number",
            "stock": "number",
            "image": "string (URL)"
        }
    ],
    "totalBooks": "number"
}
```

### Get Book by ID
```http
GET /api/books/:id
```

**Response:**
```json
{
    "success": true,
    "book": {
        "bookId": "string",
        "title": "string",
        "author": "string",
        "category": "string",
        "description": "string",
        "price": "number",
        "stock": "number",
        "image": "string (URL)"
    }
}
```

### Create New Book
```http
POST /api/books
```

**Request Body:**
```json
{
    "bookId": "string (unique)",
    "title": "string",
    "author": "string",
    "category": "string",
    "description": "string",
    "price": "number",
    "stock": "number"
}
```

**Response:**
```json
{
    "success": true,
    "book": {
        "bookId": "string",
        "title": "string",
        "author": "string",
        "category": "string",
        "description": "string",
        "price": "number",
        "stock": "number",
        "image": "string (URL)"
    }
}
```

### Update Book
```http
PUT /api/books/:id
```

**Request Body:**
```json
{
    "category": "string (optional)",
    "price": "number (optional)",
    "stock": "number (optional)",
    "description": "string (optional)"
}
```

**Response:**
```json
{
    "success": true,
    "book": {
        "bookId": "string",
        "title": "string",
        "author": "string",
        "category": "string",
        "description": "string",
        "price": "number",
        "stock": "number",
        "image": "string (URL)",
        "updatedAt": "date"
    }
}
```

### Delete Book
```http
DELETE /api/books/:id
```

**Response:**
```json
{
    "success": true,
    "message": "Book deleted"
}
```

### Upload Book Cover
```http
POST /api/books/:id/cover
```

**Request:**
- Content-Type: multipart/form-data
- Field name: "image"
- Supported formats: Image files

**Response:**
```json
{
    "success": true,
    "book": {
        "bookId": "string",
        "title": "string",
        "author": "string",
        "category": "string",
        "description": "string",
        "price": "number",
        "stock": "number",
        "image": "string (URL)"
    },
    "message": "Book cover uploaded successfully"
}
```

## 👥 Authors API Documentation

### Get All Authors
```http
GET /api/authors
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of authors per page (default: 10)
- `name` (optional): Search authors by name (case-insensitive)
- `nationality` (optional): Filter by nationality (case-insensitive)
- `genres` (optional): Filter by genres (case-insensitive)

**Response:**
```json
{
    "success": true,
    "authors": [
        {
            "authorId": "string",
            "name": "string",
            "email": "string",
            "biography": "string",
            "genres": ["string"],
            "nationality": "string",
            "birthDate": "date",
            "publications": ["string"],
            "contactInfo": {
                "address": "string",
                "phone": "string"
            }
        }
    ],
    "totalAuthors": "number"
}
```

### Get Author by ID
```http
GET /api/authors/:id
```

**Response:**
```json
{
    "success": true,
    "author": {
        "authorId": "string",
        "name": "string",
        "email": "string",
        "biography": "string",
        "genres": ["string"],
        "nationality": "string",
        "birthDate": "date",
        "publications": ["string"],
        "contactInfo": {
            "address": "string",
            "phone": "string"
        }
    }
}
```

### Create New Author
```http
POST /api/authors
```

**Request Body:**
```json
{
    "authorId": "string (unique)",
    "name": "string",
    "email": "string",
    "biography": "string",
    "genres": ["string"],
    "nationality": "string",
    "birthDate": "date",
    "publications": ["string"],
    "contactInfo": {
        "address": "string",
        "phone": "string"
    }
}
```

**Response:**
```json
{
    "success": true,
    "author": {
        "authorId": "string",
        "name": "string",
        "email": "string",
        "biography": "string",
        "genres": ["string"],
        "nationality": "string",
        "birthDate": "date",
        "publications": ["string"],
        "contactInfo": {
            "address": "string",
            "phone": "string"
        }
    }
}
```

### Update Author
```http
PUT /api/authors/:id
```

**Request Body:**
```json
{
    "biography": "string (optional)",
    "genres": ["string"] (optional),
    "nationality": "string (optional)",
    "publications": ["string"] (optional),
    "contactInfo": {
        "address": "string (optional)",
        "phone": "string (optional)"
    }
}
```

**Response:**
```json
{
    "success": true,
    "author": {
        "authorId": "string",
        "name": "string",
        "email": "string",
        "biography": "string",
        "genres": ["string"],
        "nationality": "string",
        "birthDate": "date",
        "publications": ["string"],
        "contactInfo": {
            "address": "string",
            "phone": "string"
        },
        "updatedAt": "date"
    }
}
```

### Delete Author
```http
DELETE /api/authors/:id
```

**Response:**
```json
{
    "success": true,
    "message": "Author deleted"
}
```

## 👤 Users API Documentation

### Get All Users (Admin Only)
```http
GET /users
```

**Headers:**
- `Authorization`: Bearer {token}

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of users per page (default: 10)
- `email` (optional): Search users by email (case-insensitive)
- `name` (optional): Search users by name (case-insensitive)

**Response:**
```json
{
    "success": true,
    "users": [
        {
            "_id": "string",
            "fullName": {
                "firstName": "string",
                "lastName": "string"
            },
            "email": "string",
            "profilePicture": "string (URL)",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ],
    "totalUsers": "number"
}
```

### Get User by ID (Admin or Own Profile)
```http
GET /users/:id
```

**Headers:**
- `Authorization`: Bearer {token}

**Response:**
```json
{
    "success": true,
    "user": {
        "_id": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "email": "string",
        "profilePicture": "string (URL)",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Register New User
```http
POST /users/register
```

**Request Body:**
```json
{
    "fullName": {
        "firstName": "string (min 2 chars)",
        "lastName": "string"
    },
    "email": "string (valid email)",
    "password": "string (min 6 chars)"
}
```

**Response:**
```json
{
    "success": true,
    "user": {
        "_id": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "email": "string",
        "profilePicture": "string (URL)",
        "createdAt": "date"
    },
    "token": "string (JWT)"
}
```

### User Login
```http
POST /users/login
```

**Request Body:**
```json
{
    "email": "string (valid email)",
    "password": "string (min 6 chars)"
}
```

**Response:**
```json
{
    "success": true,
    "user": {
        "_id": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "email": "string",
        "profilePicture": "string (URL)"
    },
    "token": "string (JWT)"
}
```

### Upload Profile Picture
```http
POST /users/upload-profile-picture
```

**Headers:**
- `Authorization`: Bearer {token}
- Content-Type: multipart/form-data

**Request:**
- Field name: "image"
- Supported formats: Image files (jpg, jpeg, png)

**Response:**
```json
{
    "success": true,
    "user": {
        "_id": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "email": "string",
        "profilePicture": "string (URL)",
        "updatedAt": "date"
    },
    "message": "Profile picture uploaded successfully"
}
```

## 📖 Loans API Documentation

### Get All Loans (Admin Only)
```http
GET /loans
```

**Headers:**
- `Authorization`: Bearer {token}

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of loans per page (default: 10)
- `status` (optional): Filter by status (active, returned, overdue)
- `userId` (optional): Filter by user ID
- `bookId` (optional): Filter by book ID

**Response:**
```json
{
    "success": true,
    "loans": [
        {
            "_id": "string",
            "user": {
                "_id": "string",
                "fullName": {
                    "firstName": "string",
                    "lastName": "string"
                },
                "email": "string"
            },
            "book": {
                "_id": "string",
                "bookId": "string",
                "title": "string",
                "author": "string"
            },
            "status": "string (active/returned/overdue)",
            "issueDate": "date",
            "dueDate": "date",
            "returnDate": "date (if returned)",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ],
    "totalLoans": "number"
}
```

### Get Loan by ID
```http
GET /loans/:id
```

**Headers:**
- `Authorization`: Bearer {token}

**Response:**
```json
{
    "success": true,
    "loan": {
        "_id": "string",
        "user": {
            "_id": "string",
            "fullName": {
                "firstName": "string",
                "lastName": "string"
            },
            "email": "string"
        },
        "book": {
            "_id": "string",
            "bookId": "string",
            "title": "string",
            "author": "string"
        },
        "status": "string (active/returned/overdue)",
        "issueDate": "date",
        "dueDate": "date",
        "returnDate": "date (if returned)",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Create New Loan
```http
POST /loans
```

**Headers:**
- `Authorization`: Bearer {token}

**Request Body:**
```json
{
    "bookId": "string",
    "issueDate": "date (optional, defaults to current date)",
    "dueDate": "date (required)"
}
```

**Response:**
```json
{
    "success": true,
    "loan": {
        "_id": "string",
        "user": {
            "_id": "string",
            "fullName": {
                "firstName": "string",
                "lastName": "string"
            }
        },
        "book": {
            "_id": "string",
            "bookId": "string",
            "title": "string"
        },
        "status": "active",
        "issueDate": "date",
        "dueDate": "date",
        "createdAt": "date"
    }
}
```

### Return Book
```http
PUT /loans/:id/return
```

**Headers:**
- `Authorization`: Bearer {token}

**Response:**
```json
{
    "success": true,
    "loan": {
        "_id": "string",
        "status": "returned",
        "returnDate": "date",
        "updatedAt": "date"
    },
    "message": "Book returned successfully"
}
```

## 📝 Reviews API Documentation

### Get Book Reviews
```http
GET /books/:id/reviews
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of reviews per page (default: 10)
- `ratings` (optional): Filter by rating value (1-5)

**Response:**
```json
{
    "success": true,
    "reviews": [
        {
            "_id": "string",
            "user": {
                "_id": "string",
                "fullName": {
                    "firstName": "string",
                    "lastName": "string"
                },
                "email": "string"
            },
            "book": {
                "_id": "string",
                "bookId": "string",
                "title": "string",
                "author": "string"
            },
            "ratings": "number (1-5)",
            "description": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ],
    "totalReviews": "number"
}
```

### Get Review by ID
```http
GET /books/:id/reviews/:reviewId
```

**Response:**
```json
{
    "success": true,
    "review": {
        "_id": "string",
        "user": {
            "_id": "string",
            "fullName": {
                "firstName": "string",
                "lastName": "string"
            },
            "email": "string"
        },
        "book": {
            "_id": "string",
            "bookId": "string",
            "title": "string",
            "author": "string"
        },
        "ratings": "number (1-5)",
        "description": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Create Review
```http
POST /books/:id/reviews
```

**Headers:**
- `Authorization`: Bearer {token}

**Request Body:**
```json
{
    "ratings": "number (1-5)",
    "description": "string"
}
```

**Response:**
```json
{
    "success": true,
    "review": {
        "_id": "string",
        "user": {
            "_id": "string",
            "fullName": {
                "firstName": "string",
                "lastName": "string"
            }
        },
        "book": {
            "_id": "string",
            "bookId": "string",
            "title": "string"
        },
        "ratings": "number (1-5)",
        "description": "string",
        "createdAt": "date"
    }
}
```

### Update Review
```http
PUT /books/:id/reviews/:reviewId
```

**Headers:**
- `Authorization`: Bearer {token}

**Request Body:**
```json
{
    "ratings": "number (1-5, optional)",
    "description": "string (optional)"
}
```

**Response:**
```json
{
    "success": true,
    "review": {
        "_id": "string",
        "ratings": "number (1-5)",
        "description": "string",
        "updatedAt": "date"
    },
    "message": "Review updated successfully"
}
```

### Delete Review
```http
DELETE /books/:id/reviews/:reviewId
```

**Headers:**
- `Authorization`: Bearer {token}

**Response:**
```json
{
    "success": true,
    "message": "Review deleted successfully"
}
```

## 🚨 Error Handling & Status Codes

### HTTP Status Codes

| Code | Description | Usage Examples |
|------|-------------|----------------|
| 200 | OK | Successful GET, PUT, DELETE operations |
| 201 | Created | Successful POST operations (new user, book, review, etc.) |
| 400 | Bad Request | Invalid input, validation errors |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate entry (email, review, etc.) |
| 500 | Internal Server Error | Server-side errors |

### Common Error Responses

All error responses follow this format:
```json
{
    "success": false,
    "message": "Error description"
}
```

### Authentication Errors
- 401: "Authentication token missing"
- 401: "Invalid authentication token"
- 403: "Access denied. Admin privileges required"

### User-Related Errors
- 400: "Invalid email format"
- 400: "Password must be at least 6 characters"
- 400: "First name must be at least 2 characters"
- 409: "Email already exists"
- 404: "User not found"
- 400: "Invalid file format for profile picture"
- 400: "Profile picture file too large"

### Book-Related Errors
- 400: "Invalid book data"
- 400: "Book ID already exists"
- 404: "Book not found"
- 400: "Invalid stock value"
- 400: "Invalid price value"
- 400: "Invalid file format for book cover"
- 400: "Book cover file too large"

### Author-Related Errors
- 400: "Invalid author data"
- 409: "Author with this email already exists"
- 404: "Author not found"
- 400: "Invalid genres format"
- 400: "Invalid date format for birth date"

### Loan-Related Errors
- 400: "Book not available (out of stock)"
- 400: "Book already borrowed by user"
- 400: "Invalid due date"
- 404: "Loan not found"
- 400: "Book already returned"
- 400: "Cannot extend loan period for overdue book"
- 403: "Not authorized to manage this loan"

### Review-Related Errors
- 400: "Invalid rating value (must be 1-5)"
- 409: "User has already reviewed this book"
- 404: "Review not found"
- 403: "Not authorized to modify this review"
- 400: "Review description required"

### File Upload Errors
- 400: "File size exceeds limit"
- 400: "Invalid file type"
- 400: "File upload failed"
- 500: "File storage error"

### Validation Rules

#### User Validation
- Email: Must be valid email format
- Password: Minimum 6 characters
- First Name: Minimum 2 characters
- Profile Picture: Max size 5MB, formats: jpg, jpeg, png

#### Book Validation
- BookId: Unique identifier
- Title: Required
- Author: Required
- Price: Positive number
- Stock: Non-negative integer
- Cover Image: Max size 5MB, formats: jpg, jpeg, png

#### Author Validation
- Name: Required
- Email: Valid email format
- Genres: Array of strings
- Birth Date: Valid date format

#### Loan Validation
- Book ID: Must exist in database
- Due Date: Must be future date
- Issue Date: Cannot be future date

#### Review Validation
- Rating: Number between 1-5
- Description: Required, non-empty string


### Best Practices
1. Always check the `success` field in responses
2. Include authentication token in header as: `Authorization: Bearer <token>`
3. Handle rate limiting by checking response headers
4. Use pagination for list endpoints to manage large datasets
5. Include proper error handling for all API calls
6. Validate input data before sending to API
7. Follow the specified data formats for dates and file uploads