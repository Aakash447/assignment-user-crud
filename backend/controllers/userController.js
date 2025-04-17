const User = require("../models/user");

// Get all users
exports.getAllUsers = async (req, reply) => {
  try {
    console.log('model User',User)
    const users = await User.find();
    reply.send(users);
  } catch (err) {
    console.error('err:',err)
    reply.status(500).send(err);
  }
};

// Get a single user
exports.getUserById = async (req, reply) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }
    reply.send(user);
  } catch (err) {
    reply.status(500).send(err);
  }
};

// Create a new user
exports.createUser = async (req, reply) => {
  try {
    // check email
    const payload = {
      name: req.body?.name,
      interests: req.body?.interests,
      age: req.body?.age,
      mobile: req.body?.mobile,
      email: req.body?.email,
    }
    const [existedUser] = await User.find({email: payload.email});
    if(existedUser){
      return reply.send('Email already exist')
    }
    console.log({existedUser})
    const user = new User(req.body);
    await user.save();
    reply.code(201).send(user);
  } catch (err) {
    reply.status(400).send(err);
  }
};

// Update a user
exports.updateUser = async (req, reply) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }
    reply.send(user);
  } catch (err) {
    reply.status(400).send(err);
  }
};

// Delete a user
exports.deleteUser = async (req, reply) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }
    reply.send({ message: 'User deleted' });
  } catch (err) {
    reply.status(500).send(err);
  }
};