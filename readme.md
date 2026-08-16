# Project Architecture

This project is a line-of-business app with a front-end, api middle tier and a postgres database back-end. 

**The sole purpose is to create data in the front-end and to deliver it to the back-end and vice-versa.**

## Technologies

- HTML/CSS/JavaScript
- [Fastify - Api](https://fastify.dev/)
- [JSON Schema - Fastify Validation](https://json-schema.org/)
- [Postgres - Database](https://www.postgresql.org/)
- [VueJS - Frontend UI](https://vuejs.org/)
- [Vitest - Testing](https://vitest.dev/)


## Project File Structure:

The project will have the `api` and `client` folder for the main deliverables, and a `packages` folder for any additional custom npm modules used in the project.

The `api` project will be a simple yet powerful restApi that uses a services architecture. 

- The `index.js` file will set up the server and serve the API routes.
- The `router.js` file will aggregate the routes from the files in the `/routes` folder using the fastify-plugin architecture (where each file in `/routes` is a fastify plugin defining CRUD routes)
- The `/database` folder will contain the `schema.sql` file, which will define the creation of the postgres database schema.
- IMPORTANT: THE `/database/schema.sql` FILE IS THE SOURCE OF TRUTH FOR ALL DATA MODEL STRUCTURES!
- The `/database/seed.sql` has all of the data required for a minimal database setup - (users, permissions, settings, etc.). 
- Each 'fastify plugin' will exist in a module with an 'Api' and a 'Service' file. 
    - The API file has a naming convetion based on the parent folder (e.g.: `bizcards/bizcardsApi.js` and `bizcards/bizcardsService.js`)
 
 ### File Structure Example:

```
.
├─ api
│  ├─ database
│  │  ├─ schema.sql
│  │  └─ seed.sql
│  ├─ modules
│  │  ├─ bizcards
│  │  │  ├─ bizcardsApi.js
│  │  │  └─ bizcardsService.js
│  │  ├─ useraccounts
│  │  │  ├─ useraccountsApi.js
│  │  │  └─ useraccountsService.js
│  │  └─ (...additional modules)
│  ├─ schema
│  │  └─ (...fastify schema files)
│  ├─ services
│  │  └─ (...service files)
│  ├─ utils
│  │  └─ (...utility files)
│  ├─ index.js
│  ├─ router.js
│  ├─ server.config.js
│  └─ package.json
├─ client
│  ├─ src
│  ├─ styles
│  └─ package.json
├─ packages
│  ├─ packageA
│  │  ├─ src
│  │  └─ package.json
│  └─ packageB
│     ├─ src
│     └─ package.json
└─ package.json
```

# API Project

This project serves as the robust middle-tier REST API, built with **Fastify**. It is the sole gateway for data interaction, managing all business logic and data validation before communicating with the Postgres database. It utilizes a dedicated service architecture to maintain separation of concerns.

### Project Structure Overview
*   **`api/`**: Contains the core server logic.
*   **`api/database/`**: Defines the entire data model (`schema.sql`) and seeding data (`seed.sql`). This folder is the source of truth for the database schema.
*   **`api/modules/`**: Houses domain-specific API and Service pairs (e.g., `bizcardsApi.js` and `bizcardsService.js`), adhering to a plugin architecture.
*   **`api/services/`**: Contains reusable service logic that handles database interactions and complex business rules.

# Client Project

This project represents the user-facing frontend UI, built with **VueJS**. Its primary purpose is to provide a rich, dynamic interface for users to input, view, and manage data. It communicates exclusively with the API Project via defined endpoints.

### Project Structure Overview
*   **`client/`**: The root for the frontend application.
*   **`client/src/`**: Contains the primary Vue components, application logic, and state management.
*   **`client/pages/`**: Directory grouping components by feature or page route.
*   **`client/components/`**: Reusable, UI-specific components (e.g., forms, list views, controls) that maintain a consistent look and feel across the application.