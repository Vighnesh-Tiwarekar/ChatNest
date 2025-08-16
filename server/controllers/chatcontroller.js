import { chatMessages, chatRoom } from "../schema/chatschema.js"
import { userlogin } from "../schema/loginschema.js"


export const get_contacts = async (req, res) => {

    try {

        const username = req.username

        const rooms = await chatRoom.find({
            users: { $in: [username] },
        },
        )

        const contacts = rooms.map(room => {
            return room.users.find(user => user !== username)
        })


        // const contacts = await userlogin.find(
        //     { username: { $ne: req.username } }, 
        //     { username: 1, _id: 0 }              
        // )

        res.status(201).json(contacts)

    }
    catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const get_messages = async (req, res) => {

    try {

        console.log('requesting messages')

        if (!req.chatRoom) {
            return res.status(400).json({ message: 'Missing chatRoom ID' })
        }

        console.log('jj')

        const messages = await chatMessages.find({ chatRoom: req.chatRoom })

        console.log(messages)

        res.status(202).json(messages)

    }
    catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const store_message = async (sender, room, mssg) => {
  try {
    const savedMessage = await chatMessages.create({
      chatRoom: room._id,
      sender: sender,
      message: mssg
    });
    return savedMessage;
  } catch (err) {
    console.log(`Error: ${err}`);
    return null;
  }
};