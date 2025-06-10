import express from 'express';
import {
  createInvoice,
  listInvoices,
  deleteInvoice,
} from '../controllers/invoice.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();
router.use(authenticate);

router.post   ('/',       createInvoice);
router.get    ('/',       listInvoices);
router.delete ('/:id',    deleteInvoice);

export default router;
