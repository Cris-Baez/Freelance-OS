// src/services/client.service.ts
import { prisma } from '../prisma/client';

export const createClient = async (data: {
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  userId: string;
}) => {
  return prisma.client.create({ data });
};

export const getClients = async (userId: string) => {
  return prisma.client.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getClientById = async (id: string) => {
  return prisma.client.findUnique({ where: { id } });
};

export const updateClient = async (id: string, data: any) => {
  return prisma.client.update({ where: { id }, data });
};

export const deleteClient = async (id: string) => {
  return prisma.client.delete({ where: { id } });
};

