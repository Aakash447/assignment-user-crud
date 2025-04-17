const fastify = require('fastify')({ logger: true });
const userRoutes = require('./routes/user');
const { connectDB } = require('./db/conn');
require('dotenv').config();

// Connect to database
connectDB();

// Register routes
fastify.register(userRoutes, { prefix: '/api/users' });

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3008, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();