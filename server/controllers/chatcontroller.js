import { chatMessages, chatRoom } from "../schema/chatschema.js"
import { userlogin } from "../schema/loginschema.js"


export const get_friends = async (req, res) => {

    try {

        const username = req.username

        const rooms = await chatRoom.find({
            users: { $in: [username] },
        },
        )

        const friends = rooms.map(room => {
            return room.users.find(user => user !== username)
        })


        // const contacts = await userlogin.find(
        //     { username: { $ne: req.username } }, 
        //     { username: 1, _id: 0 }              
        // )

        res.status(201).json(friends)

    }
    catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const get_messages = async (req, res) => {

    try {
        
        if (!req.chatRoom) {
            return res.status(400).json({ message: 'Missing chatRoom ID' })
        }

        const messages = await chatMessages.find({ chatRoom: req.chatRoom })

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