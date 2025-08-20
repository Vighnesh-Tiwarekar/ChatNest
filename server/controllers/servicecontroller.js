import { userlogin } from "../schema/loginschema.js";
import { requests } from "../schema/requestschema.js";


export const get_username = async(req, res)=> {

    try
    {
        res.status(200).json(req.username);
    }
    catch(err)
    {
        console.log(`Error: ${err}`)
    }
}


export const get_users = async (req, res) => {

    try {

        const users = await userlogin.find({}, { _id: 0, username: 1 })

        res.status(201).json(users);

    }
    catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const get_requests = async(req, res) => {

    try {

        const requests = await requests.find({})

        res.status(200).json(requests);

    }
    catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json({ message: 'Internal Server Error' })
    }

}