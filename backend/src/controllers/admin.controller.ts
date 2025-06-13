// src/controllers/admin.controller.ts
import { RequestHandler } from 'express';
import { prisma } from '../prisma/client';

export const listUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUserRole: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body as { role: string };
    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
