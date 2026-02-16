import bcrypt from 'bcrypt'

const hashPassword = async (password) =>{
    return await bcrypt.hash(password , parseInt(process.env.SALT))
}
const comparePassword = async (password , dbpassword) =>{
    return await bcrypt.compare(password , dbpassword)
}

export {hashPassword , comparePassword}