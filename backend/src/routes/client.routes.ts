// src/routes/client.routes.ts
import express from 'express';
import {
  create,
  list,
  show,
  update,
  remove,
} from '../controllers/client.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Aplica JWT a todas las rutas de /api/clients
router.use(authenticate);

router.post('/',    create);
router.get('/',     list);
router.get('/:id',  show);
router.put('/:id',  update);
router.delete('/:id', remove);

export default router;









