import { Request, Response } from "express";
import { prisma } from '../lib/prisma';

//const prisma = new PrismaClient();

// Criar nova tarefa
export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const userId = req.user?.id; // Obtendo o ID do usuário autenticado

    if (!title || !description) {
        return res.status(400).json({ error: "Título e descrição são obrigatórios." });
    }

    if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                userId, // Associando a tarefa ao usuário autenticado
            },
        })
        return res.status(201).json(task);

    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar tarefa.", error });
    }
}

// Listar todas as tarefas do usuário autenticado
export const getUserTasks = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId: userId, // Filtrando tarefas pelo ID do usuário autenticado
            },
            orderBy: {
                criatedAt: 'desc', // Ordenando as tarefas pela data de criação
            },
        })
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao listar tarefas.", error });
    }
}

// Atualizar uma tarefa
export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    try {
        const task = await prisma.task.updateMany({
            where: {
                id: id,
                userId: userId, // Garantindo que o usuário só possa atualizar suas próprias tarefas
            },
            data: {
                title,
                description,
                completed,
            },
        });

        if (task.count === 0) {
            return res.status(404).json({ error: "Tarefa não encontrada ou não pertence ao usuário." });
        }

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar tarefa.", error });
    }
}

// Deletar uma tarefa
export const deleteTask = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    try {
        const task = await prisma.task.deleteMany({
            where: {
                id: id,
                userId: userId, // Garantindo que o usuário só possa deletar suas próprias tarefas
            },
        });

        if (task.count === 0) {
            return res.status(404).json({ error: "Tarefa não encontrada ou não pertence ao usuário." });
        }

        return res.status(200).json({ message: "Tarefa deletada com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar tarefa.", error });
    }
}

// alternar o status de conclusão de uma tarefa
export const toggleTaskDone = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    try {
        const task = await prisma.task.findFirst({
            where: { id, userId},
        })

        if (!task) {
            return res.status(404).json({ error: "Tarefa não encontrada ou não pertence ao usuário." });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { completed: !task.completed }, // Alternando o status de conclusão
        })

        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao alternar status da tarefa.", error });
    }
}

