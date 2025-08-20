import { userlogin } from "../schema/loginschema.js";
import { requests } from "../schema/requestschema.js";


export const get_username = async (req, res) => {

    try {
        res.status(200).json(req.username);
    }
    catch (err) {
        console.log(`Error: ${err}`)
    }
}

export const get_users = async (req, res) => {

    try {

        const rooms = await chatRoom.find(
            { users: { $in: [req.username] } },
            { _id: 0, users: 1 }
        ).lean();

        let friends = rooms.flatMap(room => room.users);
        friends = friends.filter(u => u !== req.username);


        const users = await userlogin.find({
            name: { $nin: [req.username, ...friends] }
        }, { _id: 0, username: 1 }).lean()

        res.status(201).json(users);

    }
    catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const get_requests = async (req, res) => {

    try {

        const request = await requests.find({}).lean()

        res.status(200).json(request);

    }
    catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json({ message: 'Internal Server Error' })
    }

}

export const send_request = async (req, res) => {

    try {

        const details = req.body;

        const existing = await requests.findOne({
            sender: req.username,
            receiver: details.name,
            status: { $in: ['pending', 'accepted'] }
        }).lean();

        if (existing) {
            return res.status(409).json({ message: "Friend request already sent" });
        }

        await requests.create({
            sender: req.username,
            receiver: details.name,
            status: 'pending'
        })

        res.status(201).json({ message: 'Friend Request Sent' })

    }
    catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const accept_request = async(req, res) => {

    try {

        const details = req.body;

        const result = await requests.updateOne({
            sender: details.name,
            receiver: req.username,
            status: "pending"
        },
        {
            $set: { status: "accepted" }
        }).lean();

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No pending request found to accept" });
        }

        res.status(200).json({ message: "Friend Request Accepted" })

    }
    catch (err) {
        console.log(`Error ${err}`)
        res.status(500).json({ message: "Internal Server Error" })
    }

}

export const cancel_request = async (req, res) => {

    try {

        const details = req.body;

        const result = await requests.deleteOne({
            sender: req.username,
            receiver: details.name,
            status: "pending"
        }).lean();

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No pending request found" });
        }

        res.status(200).json({ message: "Friend Request Canceled" })

    }
    catch (err) {
        console.log(`Error ${err}`)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const reject_request = async (req, res) => {

    try {

        const details = req.body;

        const result = await requests.updateOne({
            sender: details.name,
            receiver: req.username,
            status: "pending"
        },
        {
            $set: { status: "rejected" }
        }).lean();

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No pending request found to reject" });
        }

        res.status(200).json({ message: "Friend Request Rejected" })

    }
    catch (err) {
        console.log(`Error ${err}`)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const active_request_count = async(req, res) => {

    try {

        const result = await requests.find({
            receiver: req.username,
            status: "pending"
        }).lean()

        res.status(200).json(result.length)

    }
    catch (err) {
        console.log(`Error ${err}`)
        res.status(500).json({ message: "Internal Server Error" })
    }

}