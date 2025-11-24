import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  changeBusinessStatus,
  deleteUser
} from '../controllers/userController.js';
import { authenticate, requireAdmin, requireOwnerOrAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/', authenticate, requireAdmin, getAllUsers);
router.get('/:id', authenticate, requireOwnerOrAdmin, getUserById);
router.put('/:id', authenticate, requireOwnerOrAdmin, updateUser);
router.patch('/:id', authenticate, requireOwnerOrAdmin, changeBusinessStatus);
router.delete('/:id', authenticate, requireOwnerOrAdmin, deleteUser);

export default router;
