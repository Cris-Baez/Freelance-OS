// src/services/user.service.ts
import { prisma } from '../prisma/client';
import { hashPassword, comparePassword } from '../utils/hash';

export const createUser = async (email: string, name: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: { email, name, password: hashedPassword },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  return user;
};
