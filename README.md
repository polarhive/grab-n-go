# grab-n-go

Try it: [grabngo-dev.vercel.app](https://grabngo-dev.vercel.app)

## Setup Environment

Create an `.env` file and add the following environment variables

```plain
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/<DOC_ID>/gviz/tq?tqx=out:csv
MONGODB_URI=mongodb://<ATLAS_URL>/authDB
```

---
## Install Dependencies

`pnpm` is faster and more disk space efficient.

```
npm install -g pnpm 
pnpm i
```

## Backend

```sh
node backend/server.js
```

## Frontend

```sh
pnpm start
```

