// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import * as UserService from '../services/user.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const user = await UserService.createUser(email, name, password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.loginUser(email, password);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
