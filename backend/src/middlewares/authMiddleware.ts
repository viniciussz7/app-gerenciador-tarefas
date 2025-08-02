//backend\src\middlewares\authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../@types/express"; // Importando a interface UserPayload


const secretKey = process.env.JWT_SECRET as string;

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, secretKey) as UserPayload;
        req.user = decoded; // injetando os dados do usuário no request
        next();

    } catch (err) {
        return res.status(403).json({ message: "Token inválido ou expirado" });

    }
}
