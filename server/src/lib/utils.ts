import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 15);
}

export async function comparePassword(inputPassword: string, hashedPassword: string) {
    console.log(hashedPassword);
    
    return await bcrypt.compare(inputPassword,hashedPassword);
}