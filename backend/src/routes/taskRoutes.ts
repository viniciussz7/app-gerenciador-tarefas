import { Router } from "express";
import { createTask, getUserTasks, updateTask, deleteTask, toggleTaskDone } from "../controllers/taskController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticateToken); // Protegendo as rotas de tarefas com o middleware de autenticação

// Rota para criar uma nova tarefa
router.post("/", createTask);

// Rota para listar todas as tarefas do usuário autenticado
router.get("/", getUserTasks);

// Rota para atualizar uma tarefa
router.put("/:id", updateTask);

// Rota para deletar uma tarefa
router.delete("/:id", deleteTask);

// Rota para marcar/desmarcar uma tarefa como concluída
router.patch("/:id/toggle", toggleTaskDone);

export default router;