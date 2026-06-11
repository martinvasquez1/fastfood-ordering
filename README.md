# Fastfood-ordering

Monorepo for a fast food ordering service, including a user-facing website, a delivery app, and a RESTfull API. It uses TurboRepo to manage multiple services in one repository, streamlining development and deployment.

> [!WARNING]
> This project requires Node.js to run the services locally. A Dev Container is currently being developed to simplify setup and provide a ready-to-use development environment.

## Installation

```bash
git clone URL
npm install

npm install turbo --global
```

## Running the Project

Each service can be run individually:

```bash
cd api
npm run dev
```

```bash
cd web
npm run dev
```

Or use Turbo to run all services simultaneously:

```bash
turbo run dev
```