// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes   from './routes/auth.routes';
import clientRoutes from './routes/client.routes';
import projectRoutes from './routes/project.routes';
import invoiceRoutes from './routes/invoice.routes';
import taskRoutes    from './routes/task.routes';  
// …


dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.use(express.json());
app.use('/api/projects', projectRoutes);
app.use('/api/auth',    authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/tasks',   taskRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend en http://localhost:${PORT}`));





