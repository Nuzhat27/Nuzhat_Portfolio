import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: 'Name, email and message are required.' });
  }

  const saved = await Message.create({ name, email, message });
  res.status(201).json({ message: 'Message sent successfully.', id: saved._id });
});

router.get('/', protect, async (_req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

router.patch('/:id/read', protect, async (req, res) => {
  const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(message);
});

router.delete('/:id', protect, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: 'Message deleted.' });
});

export default router;
