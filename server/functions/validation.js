import bcrypt from "bcryptjs";

export const validatepass = async (details, hashedpass) => {

    const len1 = details.email.length;

    const extra_part = len1 << 5;

    const password = details.password + extra_part.toString();

    const result = bcrypt.compare(password, hashedpass)

    return result;

}


export const validateotp = async (details, info) => {

    try{

        const isValid = await validatepass(details, info.user_password)

        if (!isValid) {
            return { message: 'Incorrect Credentials', code: 401 };
        }

        const elapsed = details.sent_at - info.createdAt;

        const elapsed_min = elapsed / 60000;

        if (elapsed_min > 5) {
            return { message: 'OTP Expired', code: 401 };
        }

        if (details.otp != info.otp) {
            return { message: 'Incorrect OTP', code: 401 };
        }

        return { message: 'OTP Verified', code: 200 };
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
        return { message: 'Internal Server Error' , code: 500}
    }

}