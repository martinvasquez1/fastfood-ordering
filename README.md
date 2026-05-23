# Fastfood-ordering

Monorepo for a fast food ordering service, including a user-facing website, a delivery app, and a RESTfull API. It uses TurboRepo to manage multiple services in one repository, streamlining development and deployment.

## Installation

```bash
git clone URL
npm install

npm install turbo --global
```

## Running the Project

Each service can be run individually:

### Example

```bash
cd api
npm start
```

```bash
cd web
npm start
```

Or use Turbo to run all services simultaneously:

```bash
turbo run dev
```