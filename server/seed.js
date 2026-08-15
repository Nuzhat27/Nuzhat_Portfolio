import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Project from './models/Project.js';
import Certification from './models/Certification.js';

const projects = [
  {
    name: 'AlgoVault',
    subtitle: 'Full-Stack DSA Interview Preparation Platform',
    goal: 'Build a platform for DSA practice, progress tracking, reviews, and mock interviews.',
    description: 'A full-stack coding interview preparation platform for practicing DSA problems, learning coding patterns, tracking practice, scheduling reviews, and conducting mock interviews.',
    stack: ['React', 'Vite', 'React Router', 'Axios', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT'],
    github: 'https://github.com/Nuzhat27/AlgoVault/tree/main',
    live: 'https://algo-vault-iota.vercel.app/',
    order: 1
  },
  {
    name: 'StudySphere',
    subtitle: 'MERN SaaS Learning Platform',
    goal: 'Build an all-in-one university platform for courses, assessments, and academic resources.',
    description: 'A multi-user learning platform with JWT authentication, RBAC, course and lesson management, uploads, auto-graded quizzes, discussions, email notifications, and dark/light UI.',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'RBAC', 'Cloudinary', 'Nodemailer', 'Tailwind CSS'],
    github: 'https://github.com/Nuzhat27/StudySphere',
    live: 'https://study-sphere-pink.vercel.app/',
    order: 2
  }
];

const certifications = [
  {
    name: 'Full Stack Web Development',
    issuer: 'Udemy',
    year: '2024',
    url: 'https://drive.google.com/file/d/16jCZoGO5MuTAED-g5Z8BS2rJljhJub7Z/view?usp=drive_link',
    order: 1
  },
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    year: '2024',
    url: 'https://www.freecodecamp.org/certification/',
    order: 2
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Project.deleteMany({});
  await Certification.deleteMany({});
  await Project.insertMany(projects);
  await Certification.insertMany(certifications);

  if (process.env.ADMIN_PASSWORD) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    console.log('ADMIN_PASSWORD_HASH=', hash);
    console.log('Copy this hash into .env as ADMIN_PASSWORD_HASH.');
  }

  console.log('Portfolio data seeded.');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
