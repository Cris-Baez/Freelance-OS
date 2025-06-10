// src/controllers/client.controller.ts
import { RequestHandler } from 'express';
import { prisma } from '../prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

// Crear cliente
export const create: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, phone, notes } = req.body;
    const userId = (req as AuthRequest).userId!;
    const client = await prisma.client.create({
      data: { name, email, phone, notes, userId },
    });
    res.status(201).json(client);
  } catch (err: any) {
    next(err);
  }
};

// Listar clientes
export const list: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const clients = await prisma.client.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(clients);
  } catch (err: any) {
    next(err);
  }
};

// Ver uno
export const show: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const { id } = req.params;
    const client = await prisma.client.findFirst({ where: { id, userId } });
    if (!client) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }
    res.json(client);
  } catch (err: any) {
    next(err);
  }
};

// Actualizar
export const update: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const { id } = req.params;
    const { name, email, phone, notes } = req.body;
    const result = await prisma.client.updateMany({
      where: { id, userId },
      data: { name, email, phone, notes },
    });
    if (result.count === 0) {
      res.status(404).json({ error: 'Client not found or unauthorized' });
      return;
    }
    res.json({ message: 'Client updated' });
  } catch (err: any) {
    next(err);
  }
};

// Eliminar
export const remove: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const { id } = req.params;
    const result = await prisma.client.deleteMany({
      where: { id, userId },
    });
    if (result.count === 0) {
      res.status(404).json({ error: 'Client not found or unauthorized' });
      return;
    }
    res.status(204).end();
  } catch (err: any) {
    next(err);
  }
};




