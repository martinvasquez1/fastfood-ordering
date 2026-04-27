export default async function globalSetup() {
  // TODO: Create a .env.test file
  process.env.JWT_SECRET = 'secret'
}