import express from 'express';
import { urlencoded } from 'express';
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import loginrouter from './routes/loginroute.js';
import { connectdb } from './config/database.js';
import chatrouter from './routes/chatroute.js';
import { validate_token } from './middlewares/validate_token.js';
import service_router from './routes/serviceroute.js';
import { chatRoom } from './schema/chatschema.js';
import { store_message } from './controllers/chatcontroller.js';

const app = express()

const port = process.env.PORT || 9000;

app.use(cors({
    origin: 'http://localhost:5173',  // The origin of your frontend
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'], // Be explicit about allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Explicitly allow Content-Type header
    credentials: true                   // Allow cookies to be sent
}));

app.use(cookieParser());

connectdb();

app.use(express.json());

app.use(urlencoded({ extended: false }))

app.use('/apis/chatnest/login', loginrouter)

app.use('/apis/chatnest/chat', validate_token, chatrouter)

app.use('/apis/chatnest/services', validate_token, service_router)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['POST', 'GET']
    }
});

io.on('connection', (socket) => {

    console.log('A user connected:', socket.id)

    socket.on('join-room', async (data) => {

        const rooms = await chatRoom.find({
            users: { $in: data }
        }).select('_id');

        rooms.forEach(room => {
            socket.join(room._id.toString())
            console.log(`Joined room ${room._id.toString()}`)
        });

    })

    socket.on('send-message', async (name, contact, mssg) => {
        console.log(`Message from ${name} to ${contact}: ${mssg}`);

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

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})