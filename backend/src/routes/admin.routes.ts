// src/routes/admin.routes.ts
import { Router } from 'express';
import * as AdminController from '../controllers/admin.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize }     from '../middleware/role.middleware';

const router = Router();

// Solo ADMIN puede acceder
router.use(authenticate, authorize('ADMIN'));

// Listar usuarios
router.get('/users', AdminController.listUsers);
// Cambiar rol
router.put('/users/:id/role', AdminController.updateUserRole);

export default router;
