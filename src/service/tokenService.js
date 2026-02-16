import jwt from 'jsonwebtoken'

const generateToken = async (paylod) =>{
    return await jwt.sign(paylod , process.env.JWTSECRET , {expiresIn:'1d'})
}

const verifyToken = async (token) =>{
    return await jwt.verify(token ,process.env.JWTSECRET)
}

export {generateToken , verifyToken}