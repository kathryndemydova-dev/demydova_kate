CRM Client Management System

This is a CRM application built with React + TypeScript + Express + Mongoose for managing clients.
It allows you to add, edit, filter, and delete clients, as well as manage statuses, VIP labels, and payment information.

Technologies Used

React 19

TypeScript

React Router DOM

React Hook Form

TanStack React Query

Phone Input (react-phone-input-2)

Lucide Icons

Axios

Cors

Express

Nodemon

Mongoose

Morgan

Dotenv

Project Structure
crm-project/
├── backend/
│   ├── controllers/
│   │   └── clientController.mjs # CRUD logic
│   ├── models/
│   │   └── clientModel.mjs # Mongoose schema for clients
│   ├── routes/
│   │   └── clientRoutes.mjs # Express routes
│   ├── .env # Environment variables
│   ├── server.mjs # Server entry point, middleware, MongoDB connection
│   ├── package.json
│   └── package-lock.json
├── src/
│   ├── api/ # Client API requests
│   │   └── clientsApi.ts
│   │
│   ├── assets/ # Static resources (images, styles, icons)
│   │
│   ├── components/ # Presentational components
│   │   ├── ClientCard.tsx # Single client card
│   │   ├── ClientForm.tsx # Add/Edit client form
│   │   └── Sidebar.tsx # Sidebar with navigation and search
│   │
│   ├── features/
│   │   └── clients/
│   │       ├── useClients.ts # React Query hook for fetching clients
│   │       └── updateClientStatus.ts # Update client payment status
│   │
│   ├── Layout/
│   │   └── Layout.tsx # Main layout with Outlet and Sidebar
│   │
│   ├── router/
│   │   └── router.tsx # Page routing
│   │
│   ├── pages/ # Full page components (routes)
│   │   ├── AddClientForm.tsx
│   │   ├── EditClientForm.tsx
│   │   ├── ClientList.tsx # Main page with client list
│   │   └── PaymentPage.tsx # List of clients awaiting payment
│   │
│   ├── types/
│   │   └── client.ts # TypeScript interfaces for clients
│   │
│   ├── App.tsx # Root component with routing
│   ├── App.css # Global styles
│   ├── index.css # Base styles
│   ├── main.tsx # Entry point
│   └── vite-env.d.ts # Vite type declarations
├── public/ # Public files
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts

Main Features
Frontend
Add a New Client

Form fields include:

Name (required, min. 5 characters)

Email (required, format validation)

Phone (required, with +380 mask via react-phone-input-2)

Company (optional)

Position (optional)

VIP Client (checkbox)

Status: active, inactive, awaiting_payment, debtor

Duplicate Check

If a client with the same email already exists, a confirm() modal appears.

If canceled — data is not submitted.

Name Validation

Client names must be entered only in Latin characters for easier searching.

If non-Latin characters are used, the form fails validation and cannot be submitted.

Client Search

Implemented in the Sidebar using searchTerm and setSearchTerm.

Displays a "No clients found" message when no results match.

Edit Client

Data is fetched via useParams().

If the ID is invalid or the client doesn’t exist — an error message is shown.

After saving — redirect to the main page.

Delete Client

Handled via onDelete.

On error — an error message is displayed.

On success — a confirmation toast is shown.

Payments Page

Available at /payments.

Displays clients with statuses: awaiting_payment, debtor, inactive.

Allows updating status when payment is received (client is removed from the list).

Sidebar

Includes navigation buttons:

Main page

Add new client

Payments list

Search input

Active links are highlighted with active class.

Validation

Name: min. 5 characters, required

Email: must follow format user@example.com

Phone: validated using PhoneInput and libphonenumber-js with country selection

All validations are implemented via react-hook-form.

FAQ

The project includes a FAQ page with Q&A, serving as a user guide.

The FAQ page is linked from the main menu.

TypeScript

All entities are strictly typed.

Main types are in src/types/client.ts (Client, ClientStatus, etc.).

Types are used across API requests, forms, and pages.

Backend
ClientModel

Defines the Mongoose schema for clients in MongoDB.

Fields:

name (string, required)

email (string, required, unique, lowercase only)

phone (string)

company (string)

amount (number) — amount due

dueDate (Date) — payment deadline

status (string, default: awaiting_payment) — one of "active" | "inactive" | "awaiting_payment" | "debtor"

ClientController

Contains async CRUD handlers interacting with MongoDB via the Client model.

getClients — fetch all clients with filtering + pagination

getClient — fetch single client by ID

createClient — create new client

updateClient — update client by ID (PUT or PATCH)

deleteClient — delete client

Each method returns proper success or error responses (404/500).

ClientRoutes

Defines Express routes for client operations:

GET /api/clients — get all clients

POST /api/clients — create new client

GET /api/clients/:id — get client by ID

PUT /api/clients/:id — full update

PATCH /api/clients/:id — partial update (e.g., status)

DELETE /api/clients/:id — delete client

PUT and PATCH are handled by the same controller.

Server

Main Node.js server entry file:

Uses dotenv for environment variables

Middleware: express, cors, morgan

Connects to MongoDB via mongoose

Mounts routes at /api/clients

Runs on process.env.PORT or defaults to 5000

Installation
npm install

Run Project

Frontend:

npm run dev


Backend:

nodemon server.mjs

Dashboard

The dashboard shows payment history and stats:

TOP-3 clients by each payment status

Number of new clients for the current month

Implemented with useState and client data filtering.

Additional

Styled with CSS classes: input-item, button, label, form-group.

Pagination implemented (6 clients per page).

Statuses are automatically translated to Ukrainian:

active → Активний

inactive → Неактивний

awaiting_payment → Очікує оплату

debtor → Боржник

VIP clients are marked with a yellow star 🌟.

Author

Developed by [Kateryna Demydova]