# SphereBlog - Backend

basic blog platform with backend functionalities developed using Node.js and MongoDB.Users can sign up,log in,log out and manage their accounts(changing password and name). It allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts, includes user authentication,authorization(admin,customer) and enables users to comment on blog posts.If a post or a comment is not desirable admin can delete it.

## Table of Contents

- [User Authentication](#user-authentication)
- [Blog Post CRUD Operations](#blog-post-crud-operations)
- [Database Design](#database-design)
- [Validation and Error Handling](#validation-and-error-handling)
- [Prerequisites](#Prerequisites)
- [Documentation](#documentation)
- [User Routes](#user-routes)
- [Post Routes](#post-routes)
- [Comment Routes](#comment-routes)
- [Documentation](#documentation) -[Installation](#installation) -[Running The App](#running-the-app)

### User Authentication

- Implemented user authentication using JWT (JSON Web Tokens)
- Users can register, log in, log out, and manage their accounts.

### Blog Post CRUD Operations

- Authenticated users can create new blog posts.
- All users (authenticated or not) can read/view blog posts.
- Authenticated users can update and delete their own blog posts.
- Each blog post includes a title, body, author, and creation/update timestamps.
- Undesirable post can be deleted by admin

### Database Design

- Database Design implemented with MongoDB database(Mongoose ORM).

### Validation and Error Handling

- Implemented input validation and proper error handling

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Documentation

- Document the API endpoints, including request types, parameters, and expected responses.

## User Routes

## Signup

**Endpoint:**

### `POST /users/signup`

**Description:**

Creates a new user account.

**Request Body:**

- `createUserDto` (Object): Data for creating a new user.

**Response Body:**

`success` (Boolean): Indicates the success of the signup operation.
`message` (String): Informational message about the operation.
`result` (Object): User details.

## Login

**Endpoint:**

### `POST /users/login`

**Description:**

Creates a new user account.

**Request Body:**

- `loginUserDto` Logs in a user and returns an authentication token.

**Response Body:**

`success` (Boolean): Indicates the success of the login operation.
`message` (String): Informational message about the operation.
`result` (Object): User details.

## Logout

**Endpoint:**

### `POST /users/logout`

**Description:**

Logs out the authenticated user.

**Response Body:**

`success` (Boolean): Indicates the success of the logout operation.
`message` (String): Informational message about the operation.

## Update User

**Endpoint:**

### `PATCH /users/update/:id`

**Description:**

Updates user details.

**Request Parameters:**

- `id` (String): ID of the user to update.

**Response Body:**

`success` (Boolean): Indicates the success of the update operation.
`message` (String): Informational message about the operation.
`result` (Object): User details.

## Post Routes

## Create Post

**Endpoint:**

### `POST /posts`

**Description:**

Creates a new blog post.

**Request Body:**

- `createPostDto` (Object): Data for creating a new post.

**Response Body:**

`success` (Boolean): Indicates the success of the operation.
`message` (String): Informational message about the operation.
`result` (Object): Post details.

## Get Posts

**Endpoint:**

### `POST /posts`

**Description:**

Gets all blog posts.

**Response Body:**

`success` (Boolean): Indicates the success of the operation.
`message` (String): Informational message about the operation.
`result` (Array): Array of blog posts.

## Get Post by ID

**Endpoint:**

### `GET /posts/:id`

**Description:**

Gets a specific blog post by its ID.

**Request Parameters:**

- `id` (String): ID of the blog post.

**Response Body:**

`success` (Boolean): Indicates the success of the operation.
`message` (String): Informational message about the operation.
`result` (Object): Post details.

## Update Post

**Endpoint:**

### `PUT /posts/:id`

**Description:**

Updates an existing blog post.

**Request Parameters:**

- `id` (String): ID of the blog post to update.

**Request Body:**

- `updatePostDto` (Object): Data for updating the blog post.

**Response Body:**

`success` (Boolean): Indicates the success of the operation.
`message` (String): Informational message about the operation.
`result` (Object): Post details.

## Delete Posts

**Endpoint:**

### `DELETE /posts/:id`

**Description:**

Deletes a blog post.

**Request Parameters:**

- `id` (String): ID of the blog post to delete.

**Response Body:**

`success` (Boolean): Indicates the success of the operation.
`message` (String): Informational message about the operation.

# Comments Routes

### Create Comment

**Endpoint:**

## `POST/comments/:postId`

**Description:**

Creates a new comment for a specific blog post.

**Request Parameters:**

- `postId` (String): ID of the blog post to comment on.

**Request Body:**

- `createCommentDto` (Object): Data for creating a new comment.

**Response Body:**

`success` (Boolean): Indicates the success of the operation.
`message` (String): Informational message about the operation.
`result` (Object): Comment details.

### Get Comments by Post ID

**Endpoint:**

## `GET /comments/:postId`

**Description:**

Gets all comments associated with a specific blog post.

**Request Parameters:**

- `postId` (String): ID of the blog post.

**Response Body:**

`success` (Boolean): Indicates the success of the operation.
`message` (String): Informational message about the operation.
`result` (Array): Array of comments.

### Delete Comment

**Endpoint:**

## `DELETE /comments/:id`

**Description:**

Deletes a user's own comment.

**Request Parameters:**

- `postId` (String): ID of the blog post.

**Response Body:**

`success` (Boolean): Indicates the success of the operation.
`message` (String): Informational message about the operation.

### Documentation

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hovhannisian-Sahak/SphereBlog.git
   ```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
