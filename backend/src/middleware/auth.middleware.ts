import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export interface AuthRequest extends Request {
  userId?: string;
}

// Lo tipamos como RequestHandler para que encaje en router.use(...)
export const authenticate: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ error: 'Token no provisto' });
    return; // <— sin devolver el Response
  }

  const [, token] = header.split(' ');
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = payload.userId;
    next(); // <— seguimos la cadena de middlewares
  } catch {
    res.status(401).json({ error: 'Token inválido' });
    // no devolvemos nada más
  }
};


