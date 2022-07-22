
import Express,{Request,Response } from "express";
const jwt = require('jsonwebtoken');

export const verifyToken = (req: Request, res: Response, next: () => void) => {
    try {
        const authorizationHeader = ((req.headers.authorization)as unknown)as string;
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, (process.env.TOKEN_SECRET as unknown)as string)

        next()
    } catch (error) {
        res.status(401)
        res.json(`Invalid token ${error}`)
    }
}