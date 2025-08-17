import { Server } from 'socket.io';
import { chatRoom } from '../schema/chatschema.js';
import { store_message } from '../controllers/chatcontroller.js';



export const initSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ['POST', 'GET']
        }
    });

    io.on('connection', (socket) => {

        socket.on('join-room', async (data) => {

            const rooms = await chatRoom.find({
                users: { $in: data }
            }).select('_id');

            rooms.forEach(room => {
                socket.join(room._id.toString())
            });

        })

        socket.on('send-message', async (name, contact, mssg) => {

            const room = await chatRoom.findOne({
                users: { $all: [name, contact] }
            }).select('_id');

            if (!room) {
                console.log('No room found for users.');
                return;
            }

            const savedMessage = await store_message(name, room, mssg);

            if (savedMessage) {
                io.to(room._id.toString()).emit('receive-message', savedMessage);
            }
        });


    })

}