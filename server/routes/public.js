import express from 'express';
import Project from '../models/Project.js';
import Certification from '../models/Certification.js';

const router = express.Router();

router.get('/portfolio', async (_req, res) => {
  const [projects, certifications] = await Promise.all([
    Project.find().sort({ order: 1, createdAt: -1 }),
    Certification.find().sort({ order: 1, createdAt: -1 })
  ]);
  res.json({ projects, certifications });
});

router.get('/github', async (_req, res) => {
  const username = process.env.GITHUB_USERNAME || 'Nuzhat27';
  const headers = { 'User-Agent': 'nuzhat-portfolio' };

  const [profileResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers }),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, { headers })
  ]);

  if (!profileResponse.ok || !reposResponse.ok) {
    return res.status(502).json({ message: 'GitHub data unavailable.' });
  }

  const profile = await profileResponse.json();
  const repos = await reposResponse.json();

  res.json({
    repos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    since: new Date(profile.created_at).getFullYear(),
    repositories: repos.map(r => ({
      name: r.name,
      stars: r.stargazers_count,
      url: r.html_url
    }))
  });
});

export default router;
