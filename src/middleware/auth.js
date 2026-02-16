import jwt from 'jsonwebtoken';
const authMiddleware = (req,res,next) =>{
    try {
        const token = req.cookies.token;

        const decoded = jwt.verify(token , 'secret')

    } catch (error) {
        
    }
}