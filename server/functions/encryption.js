import bcrypt from "bcryptjs";

export const encrypt = async ( email, password) => {

    const len1 = email.length;

    const extra_part = len1<<5;

    password = password + extra_part.toString();

    const hashed_pass = await bcrypt.hash(password,10);

    return hashed_pass;

}