import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validateUser, validateLogin, validateUserUpdate } from '../validation/userValidation.js';

const LOCK_TIME = 24 * 60 * 60 * 1000; // 24 hours
const MAX_LOGIN_ATTEMPTS = 3;

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // ⚠️ No hashing here — model hook handles it
    const user = new User(req.body);
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
      token
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.isLocked)
      return res.status(401).json({ message: 'Account temporarily locked due to too many failed login attempts' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCK_TIME;
      }
      await user.save();
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    const token = generateToken(user);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
      token
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ================= USERS =================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -loginAttempts -lockUntil');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -loginAttempts -lockUntil');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .select('-password -loginAttempts -lockUntil');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const changeBusinessStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isBusiness = !user.isBusiness;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully', deletedUser: user._id });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};