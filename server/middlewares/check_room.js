import { chatRoom } from '../schema/chatschema.js'

export const check_room = async (req, res, next) => {
  try {

    const contact = req.body.contact_name
    const username = req.username

    if (!username || !contact) {
      return res.status(400).json({ message: 'Missing user info' })
    }

    const users = [username, contact].sort()


    let room = await chatRoom.findOne({ users })

    if (!room) {
      room = await chatRoom.create({ users })
    }

    req.chatRoom = room._id

    next()
  } catch (err) {
    console.error('Error in check_room:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
