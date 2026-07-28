
# Authentication and Security

The project will use session-based authentication.


## Technologies

- [@fastify/cookie](https://github.com/fastify/fastify-cookie)
- [@fastify/session](https://github.com/fastify/session)
- [@fastify/rate-limit](https://github.com/fastify/fastify-rate-limit)
- [argon2](https://github.com/ranisalt/node-argon2)



## Auth Flow

These are the required flows for a functional application: 

### Register

- Hash password with argon2
- Create user
- Create email verification token
- Send email


### Login

- user fills out form, submits to api
- Find user by email and (hashed) password
- create session in db
- set session cookie


### Auth Middleware ( Fastify Hook )

- API is called
- API uses middleware to validate session token (cookie)
    - if valid, API Executes
    - if invalid, API returns 401

### Logout

- Delete session from DB
- Clear cookie


# Auth Routes

To future-proof this app, use the following auth routes:

```
/auth/login
/auth/logout
/auth/me
```

# Security

Email is the identity anchor. Always verify email before full access. Treat email change as sensitive action.

1. Hash EVERYTHING sensitive

- passwords → argon2
- session tokens → SHA-256
- reset tokens → SHA-256

2. Rate limit auth routes

- Use: 
  - @fastify/rate-limit

- Protect:
  - /login
  - /register
  - /forgot-password

