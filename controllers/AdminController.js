const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models/index");

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({
      id: newAdmin.id,
      name: newAdmin.name,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (!existingAdmin) {
      return res.status(401).json({
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingAdmin.password
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
        id: existingAdmin.id,
        name: existingAdmin.name,
        email: existingAdmin.email,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      id: existingAdmin.id,
      name: existingAdmin.name,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAdmins, createAdmin, loginAdmin }