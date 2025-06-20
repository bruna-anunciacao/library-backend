const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/User.js");

const getUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, type, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await user.create({
      name,
      type,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        type: newUser.type,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(401).json({
        status: "failed",
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });
    }
    const token = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      id: existingUser.id,
      name: existingUser.name,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, type } = req.body;

    const oldUser = await user.findByPk(id);
    if (!oldUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) oldUser.name = name;
    if (email) oldUser.email = email;
    if (type) oldUser.type = type;

    await oldUser.save();

    res
      .status(200)
      .json({ message: "User updated successfully", user: oldUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await user.findByPk(id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    await deletedUser.destroy();
    res.status(200).json({
        message: 'User deleted successfully'
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUsers, createUser, loginUser, changeUser, deleteUser };
