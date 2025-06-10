import { RequestHandler } from 'express';
import { prisma }           from '../prisma/client';

// Definimos la forma de los datos entrantes
interface TaskBody {
  title: string;
  description?: string;
  status?: string;
  projectId: string;
}

// Crear una tarea
export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, status, projectId } = req.body as TaskBody;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status ?? 'Pendiente',
        projectId,
      },
    });
    res.status(201).json(task);
  } catch (err: any) {
    next(err);
  }
};

// Listar todas las tareas
export const listTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      include: { project: { select: { name: true } } },
    });
    res.json(tasks);
  } catch (err: any) {
    next(err);
  }
};

// Actualizar una tarea existente
export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body as Partial<TaskBody>;
    const task = await prisma.task.update({
      where: { id },
      data,
    });
    res.json(task);
  } catch (err: any) {
    next(err);
  }
};

// Eliminar una tarea
export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id } });
    res.status(204).end();
  } catch (err: any) {
    next(err);
  }
};
