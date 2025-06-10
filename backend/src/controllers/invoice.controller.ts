import { RequestHandler } from 'express';
import { prisma }           from '../prisma/client';

export const createInvoice: RequestHandler = async (req, res, next) => {
  try {
    const { projectId, amount, description } = req.body;
    const invoice = await prisma.invoice.create({
      data: { projectId, amount: +amount, description },
    });
    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
};

export const listInvoices: RequestHandler = async (req, res, next) => {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { issuedAt: 'desc' },
      include: { project: { select: { name: true } } },
    });
    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

export const deleteInvoice: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.invoice.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
