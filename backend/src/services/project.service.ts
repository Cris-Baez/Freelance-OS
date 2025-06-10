// src/services/project.service.ts
import { prisma } from '../prisma/client';

export const createProject = async (userId: string, data: any) => {
  return prisma.project.create({
    data: {
      ...data,
      userId
    },
  });
};

export const getAllProjects = async (userId: string) => {
  return prisma.project.findMany({
    where: { userId },
    include: { client: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const getProjectById = async (id: string, userId: string) => {
  return prisma.project.findFirst({
    where: { id, userId },
    include: { client: true },
  });
};

export const updateProject = async (id: string, userId: string, data: any) => {
  return prisma.project.updateMany({
    where: { id, userId },
    data,
  });
};

export const deleteProject = async (id: string, userId: string) => {
  return prisma.project.deleteMany({
    where: { id, userId },
  });
};
