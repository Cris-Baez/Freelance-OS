import { RequestHandler } from 'express';
import { prisma } from '../prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

export const createProject: RequestHandler = async (req, res, next) => {
  try {
    const userId    = (req as AuthRequest).userId!;
    const {
      name,
      description,
      clientId,
      startDate,
      endDate,
      status,
    } = req.body;

    // Prisma UncheckedCreateInput espera campos planos, no relaciones anidadas
    const project = await prisma.project.create({
      data: {
        name,
        description,
        clientId,
        startDate: new Date(startDate),
        // Si endDate viene vacío o null, no lo incluimos
        ...(endDate ? { endDate: new Date(endDate) } : {}),
        status,
      },
    });

    res.status(201).json(project);
  } catch (err: any) {
    next(err);
  }
};

export const listProjects: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthRequest).userId!;

    const projects = await prisma.project.findMany({
      where: { client: { userId } }, 
      orderBy: { createdAt: 'desc' },
      include: { client: { select: { name: true } } },
    });

    res.json(projects);
  } catch (err: any) {
    next(err);
  }
};

export const showProject: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: { id, client: { userId } },
      include: { client: { select: { name: true } } },
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (err: any) {
    next(err);
  }
};

export const updateProject: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const { id } = req.params;
    const {
      name,
      description,
      clientId,
      startDate,
      endDate,
      status,
    } = req.body;

    // Usamos updateMany para respetar userId
    const result = await prisma.project.updateMany({
      where: { id, client: { userId } },
      data: {
        name,
        description,
        clientId,
        startDate: new Date(startDate),
        ...(endDate ? { endDate: new Date(endDate) } : {}),
        status,
      },
    });

    if (result.count === 0) {
      res.status(404).json({ error: 'Project not found or unauthorized' });
      return;
    }
    res.json({ message: 'Project updated' });
  } catch (err: any) {
    next(err);
  }
};

export const deleteProject: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthRequest).userId!;
    const { id } = req.params;

    const result = await prisma.project.deleteMany({
      where: { id, client: { userId } },
    });

    if (result.count === 0) {
      res.status(404).json({ error: 'Project not found or unauthorized' });
      return;
    }
    res.status(204).end();
  } catch (err: any) {
    next(err);
  }
};


