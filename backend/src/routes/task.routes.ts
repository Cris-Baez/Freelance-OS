// src/routes/task.routes.ts
import express from 'express';
import {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
} from '../controllers/task.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();
router.use(authenticate);

router.post   ('/',    createTask);
router.get    ('/',    listTasks);
router.put    ('/:id', updateTask);
router.delete ('/:id', deleteTask);

export default router;
