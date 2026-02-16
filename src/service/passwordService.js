import bcrypt from 'bcrypt'

const hashPassword = async (password) =>{
    return await bcrypt.hash(password , 10)
}
const comparePassword = async (password , dbpassword) =>{
    return await bcrypt.compare(password , dbpassword)
}

export {hashPassword , comparePassword}