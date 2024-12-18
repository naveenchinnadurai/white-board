import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config;

const SECRET_KEY = process.env.JWT_KEY || 'auasd12eqiwus189sg1db7ASD';

export const createAccessToken = (id: string, name: string) => {
    const payload = {
        id,
        name,
        issuedAT: Math.floor(Date.now() / 1000),
        expiresAt: Math.floor(Date.now() / 1000) + (60 * 60),
    };

    return jwt.sign(payload, SECRET_KEY);
};


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
    });
};