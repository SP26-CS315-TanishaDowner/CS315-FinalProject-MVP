# CS315 Final Project MVP

## Project Name
CS315 Final Project MVP - Ticket List Application

## Description
This project is a simple full-stack ticket tracking MVP.

- The front end is a React app (Vite) where users can:
  - View a list of support tickets
  - Add a new ticket
- The back end is an Express API that:
  - Stores tickets in memory
  - Serves ticket data through REST endpoints

Current API endpoints:
- GET /api/tickets
- POST /api/tickets

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
- Test 1: `GET /api/tickets` returns the default ticket list.
- Test 2: `POST /api/tickets` creates a ticket, then `GET /api/tickets` confirms it was added.

### How to run the tests (step by step)

1. Open a terminal in the project root.
2. Go to the back-end folder:

   cd back-end

3. Install dependencies (including test dependency):

   npm install

4. Run the test suite:

   npm test

5. Confirm output shows passing tests (for example, `pass 2`).
