//backend\src\routes\userRoutes.ts

import { Router, Request, Response  } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/me", authenticateToken, (req: Request, res: Response) => {
    return res.json({
        message: "Usuário autenticado com sucesso",
        user: req.user, // Dados do usuário injetados pelo middleware
    });
});

export default router;