import { NextFunction, Request, Response } from "express";

export function requireAuth() {
  const key = process.env.KEY;
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader == null || !authHeader.startsWith("Key")) {
      return res.sendStatus(401);
    }

    const [, presentedKey] = authHeader.split(" ");

    if (presentedKey !== key) {
      return res.sendStatus(401);
    }

    next();
  };
}
