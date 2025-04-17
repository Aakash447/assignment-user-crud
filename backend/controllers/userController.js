const { getDB } = require('../db/conn');
const { ObjectId } = require('mongodb');

const getAllUsers = async (req, reply) => {
  try {
    const db = getDB();
    const users = await db.collection('users').find().toArray();
    reply.send(users);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const getUserById = async (req, reply) => {
  try {
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const user = await db.collection('users').findOne({ _id: id });
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }
    reply.send(user);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const createUser = async (req, reply) => {
  try {
    const db = getDB();
    const { user, interest, age, mobile, email } = req.body;
    // Validation (Basic - you'll want more robust validation)
    if (!user || !email) {
      return reply.status(400).send({ message: 'User and email are required' });
    }
    const result = await db.collection('users').insertOne({ user, interest, age, mobile, email });
    reply.code(201).send({ ...req.body, _id: result.insertedId });
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const updateUser = async (req, reply) => {
  try {
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const { user, interest, age, mobile, email } = req.body;
    const result = await db.collection('users').updateOne({ _id: id }, { $set: { user, interest, age, mobile, email } });
    if (result.matchedCount === 0) {
      return reply.status(404).send({ message: 'User not found' });
    }
    reply.send({ message: 'User updated' });
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

const deleteUser = async (req, reply) => {
  try {
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('users').deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return reply.status(404).send({ message: 'User not found' });
    }
    reply.send({ message: 'User deleted' });
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};