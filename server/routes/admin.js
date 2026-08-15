import express from 'express';
import Project from '../models/Project.js';
import Certification from '../models/Certification.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.post('/projects', async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

router.delete('/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted.' });
});

router.post('/certifications', async (req, res) => {
  const certification = await Certification.create(req.body);
  res.status(201).json(certification);
});

router.delete('/certifications/:id', async (req, res) => {
  await Certification.findByIdAndDelete(req.params.id);
  res.json({ message: 'Certification deleted.' });
});

export default router;
