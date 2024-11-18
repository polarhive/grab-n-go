# grab-n-go

Try it: [grabngo-dev.vercel.app](https://grabngo-dev.vercel.app)

## Setup Environment

Create an `.env` file in the project root and add the following environment variables:

```
# Backend URL for API requests
VITE_BACKEND_URL=http://localhost:5000

# Food data
VITE_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/<DOC_ID>/gviz/tq?tqx=out:csv

# Users DB
MONGODB_URI=mongodb+srv://username:pass@cluster.mongodb.net
```

## Install Dependencies

We use `pnpm` for faster and more disk space efficient dependency management.

```sh
npm install -g pnpm
pnpm i
```

## Run Locally

To run the entire project (both frontend and backend):

```sh
pnpm dev
```

You can run the frontend and backend separately if needed:

```sh
pnpm dev:backend
pnpm dev:frontend
```

## Project Overview

- Frontend: Built using React, Vite, and TailwindCSS.
- Backend: Express.js API with MongoDB for the database.
- Features: Google Sheets integration and UPI QR code generation.
