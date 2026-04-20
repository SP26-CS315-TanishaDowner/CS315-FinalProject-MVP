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

## AI Usage
This project utilized AI for assistance in:
- Generating boilerplate for the React front-end
- Configuring Express.js API endpoints in the back-end
- Debugging and fixing code issues
- Troublshooting Docker configurations

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

   cd "front-end/front-end app"

5. Install front-end dependencies:

   npm install

6. Start the front-end development server:

   npm run dev

7. Open the app in your browser:

   http://localhost:5173

8. When finished, stop both terminals with Ctrl+C.
