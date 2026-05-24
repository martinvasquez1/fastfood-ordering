# API

RESTful API for Papapita built with NestJS and PostgreSQL.

## Environment Variables

The project includes a .env.example file where all required environment variables are defined to run the project correctly.

It is recommended to copy it as .env and adjust the values according to your local environment.

```bash
cp .env.example .env
```

If `GOOGLE_APP_PASSWORD` and `GOOGLE_EMAIL` are not configured, set `MAIL_ENABLED=false` to disable email sending.

The `TEST_SUBJECT` environment variable overrides the subject line for all outgoing emails.

## API Documentation

Once the project is running, the interactive API documentation can be accessed at:

http://localhost:3002/api

To generate the API specification file (open-api.json), run:

```bash
npm run generate:openapi
```

## Available Commands

| Name                         | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `npm run dev`                | Starts the development server with watch mode |
| `npm run build`              | Builds the project                            |
| `npm run start`              | Starts the application                        |
| `npm run start:prod`         | Runs the compiled production build            |
| `npm run test`               | Runs unit tests                               |
| `npm run test:e2e`           | Runs end-to-end tests                         |
| `npm run generate:openapi`   | Generates OpenAPI spec during app startup     |