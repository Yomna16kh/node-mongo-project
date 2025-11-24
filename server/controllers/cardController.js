import Card from '../models/Card.js';
import { validateCard, validateCardUpdate } from '../validation/cardValidation.js';

// Get all cards
export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate('user_id', 'name email');
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's cards
export const getUserCards = async (req, res) => {
  try {
    const cards = await Card.find({ user_id: req.user._id }).populate('user_id', 'name email');
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get card by ID
export const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate('user_id', 'name email');
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new card
export const createCard = async (req, res) => {
  try {
    const { error } = validateCard(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const card = new Card({
      ...req.body,
      user_id: req.user._id
    });

    await card.save();
    await card.populate('user_id', 'name email');
    
    res.status(201).json(card);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Business number already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update card
export const updateCard = async (req, res) => {
  try {
    const { error } = validateCardUpdate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Check if user owns the card
    if (card.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user_id', 'name email');

    res.json(updatedCard);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Business number already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Like/unlike card
export const likeCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const userId = req.user._id;
    const isLiked = card.likes.includes(userId);

    if (isLiked) {
      card.likes = card.likes.filter(id => id.toString() !== userId.toString());
    } else {
      card.likes.push(userId);
    }

    await card.save();
    await card.populate('user_id', 'name email');
    
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete card
export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Check if user owns the card or is admin
    if (card.user_id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: 'Card deleted successfully', deletedCard: card._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update business number (admin only)
export const updateBizNumber = async (req, res) => {
  try {
    const { bizNumber } = req.body;

    if (!bizNumber || bizNumber < 1000000 || bizNumber > 9999999) {
      return res.status(400).json({ message: 'Business number must be between 1000000 and 9999999' });
    }

    // Check if bizNumber is already taken
    const existingCard = await Card.findOne({ bizNumber, _id: { $ne: req.params.id } });
    if (existingCard) {
      return res.status(400).json({ message: 'Business number already exists' });
    }

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { bizNumber },
      { new: true, runValidators: true }
    ).populate('user_id', 'name email');

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
