# Sequelize TypeScript Project

A simple TypeScript project with Sequelize ORM for PostgreSQL.

## Setup

1. Clone the repository:
```
git clone <repository-url>
cd sequelize-proxy
```

2. Install dependencies:
```
npm install
```

3. Start the PostgreSQL database with Docker:
```
docker-compose up -d
```

4. Set environment variables:
Create a `.env` file in the root directory with the following:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sequelize_db
DB_USER=postgres
DB_PASSWORD=postgres
```

5. Run the application:
```
npm run dev
```

## Available Scripts

- `npm run build` - Compiles TypeScript code to JavaScript
- `npm start` - Runs the compiled JavaScript application
- `npm run dev` - Runs the TypeScript application directly with ts-node

## Database Management

- PostgreSQL is running at `localhost:5432`
- PgAdmin is available at `http://localhost:5050` (login with admin@admin.com / admin) 