import express from 'express';
import {
  createProject,
  listProjects,
  showProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();
router.use(authenticate);

router.post   ('/',       createProject);
router.get    ('/',       listProjects);
router.get    ('/:id',    showProject);
router.put    ('/:id',    updateProject);
router.delete ('/:id',    deleteProject);

export default router;


