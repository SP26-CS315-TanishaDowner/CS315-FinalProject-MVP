# CS315 Final Project MVP

## Project Name
CS315 Final Project MVP - Ticket List Application

## Description
This project is a simple full-stack ticket tracking MVP.

- The front end is a React app (Vite) where users can:
  - View a list of support tickets
  - Add, edit, and delete tickets
- The back end is an Express API that:
  - Stores tickets in memory
  - Serves ticket data through REST endpoints

Current API endpoints:
- GET /api/tickets — fetch all tickets
- POST /api/tickets — create a new ticket
- PUT /api/tickets/:id — update a ticket
- DELETE /api/tickets/:id — delete a ticket
- GET /health — health check endpoint

## Authors
- Marc Robertson
- Tanisha Downer

## How to Run the Program

### Option 1: Run with Docker Compose (recommended)

*NB : Ensure Docker Desktop is Running for Image and Container to be built otherwise it would error*

1. Open a terminal in the project root folder.
2. Build and start both services:

   docker compose up --build

3. Open the app in your browser:

   http://localhost:5173

4. Use the UI to view and add tickets.
5. Stop the app with Ctrl+C in the terminal.

### Option 2: Run Locally Without Docker

#### Prerequisites
- Node.js installed (includes npm)

#### Step-by-step

1. Open terminal #1 and go to the back-end folder:

   cd back-end

2. Install back-end dependencies:

   npm install

3. Start the back-end server:

   node server.js

4. Open terminal #2 and go to the front-end app folder:

   cd front-end/frontend

5. Install front-end dependencies:

   npm install

6. Start the front-end development server:

   npm run dev

7. Open the app in your browser:

   http://localhost:5173

8. When finished, stop both terminals with Ctrl+C.

## Automated Functional Tests

The back-end includes automated functional API tests.

### What is covered
- `GET /health` returns status 200 with `{ status: "ok" }`
- `GET /api/tickets` returns status 200 with an empty array initially
- `POST /api/tickets` creates a new ticket with auto-incrementing id and returns it
- `POST /api/tickets` created ticket appears in the ticket list when fetched
- `DELETE /api/tickets/:id` removes a ticket and returns status 200
- `PUT /api/tickets/:id` updates a ticket's title and returns status 200
- `PUT /api/tickets/:id` returns status 404 for a non-existent ticket ID

### How to run the tests (step by step)

1. Open a terminal in the project root.
2. Go to the back-end folder:

   cd back-end

3. Install dependencies (if needed):

   npm install

4. Install dev dependencies (required for testing):

   npm install --save-dev supertest

5. Run the test suite with Node's built-in test runner:

   node --test servertest.js

6. Confirm all tests pass in the output.

### Alternative from project root

You can also run backend tests without changing directories:

   cd back-end && node --test servertest.js

## Front-End Tests

The front-end includes automated tests covering ticket creation, editing, and deletion.

### How to run it

1. Open a terminal in the project root.
2. Go to the front-end app folder:

   cd front-end/frontend

3. Install dependencies if needed:

   npm install

4. Install dev dependencies (required for testing):

   npm install --save-dev vitest @testing-library/react @testing-library/dom jsdom

5. Add a test script to package.json (under scripts):

   "test": "vitest"

6. Run the test suite:

   npm test