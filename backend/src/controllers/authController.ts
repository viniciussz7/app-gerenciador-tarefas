import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Validação simples
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    try {
        // Verifica se o usuário já existe
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'Email já cadastrado!' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de "salt rounds"

        // Cria o usuário no banco de dados
        const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });

        return res.status(201).json({ message: 'Usuário criado com sucesso!', user: { id: user.id, name: user.name, email: user.email } });

    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor.", error });
    }
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validação simples
    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios!' });
    }

    try {
        // Busca o usuário
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }
        // Verifica a senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Senha incorreta!' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

        return res.status(200).json({ message: 'Login realizado com sucesso!', token, user: { id: user.id, name: user.name, email: user.email }, });

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao realizar login.' });
    }
}