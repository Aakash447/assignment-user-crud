const Fastify = require('fastify');
const app = Fastify({ logger: true });
const userRoutes = require('./routes/user');
const { connectDB } = require('./db/conn');
require('dotenv').config();

connectDB();

app.register(require('@fastify/cors')); // Enable CORS
app.register(userRoutes, { prefix: '/users' });

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    app.log.info(`Server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();