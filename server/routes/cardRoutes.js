import express from 'express';
import {
  getAllCards,
  getUserCards,
  getCardById,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
  updateBizNumber
} from '../controllers/cardController.js';
import { authenticate, requireBusiness, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllCards);
router.get('/:id', getCardById);

// Protected routes
router.get('/my-cards', authenticate, getUserCards);
router.post('/', authenticate, requireBusiness, createCard);
router.put('/:id', authenticate, updateCard);
router.patch('/:id', authenticate, likeCard);
router.delete('/:id', authenticate, deleteCard);

// Admin only routes
router.patch('/biz-number/:id', authenticate, requireAdmin, updateBizNumber);

export default router;
