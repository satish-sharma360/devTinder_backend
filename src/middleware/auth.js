import jwt from 'jsonwebtoken';
import { verifyToken } from '../service/tokenService.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).send("Please Login!")
        }
        const decoded = await verifyToken(token)

        req.user = decoded;
        next()

    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
}

export default authMiddleware