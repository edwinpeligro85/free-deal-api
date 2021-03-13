export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  production: Boolean(process.env.PRODUCTION),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  }
});
