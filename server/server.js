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

app.use('/apis/chatnest/chat', validate_token , chatrouter)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['POST', 'GET']
    }
});

io.on('connection', (socket) => {

    console.log('A user connected:', socket.id)
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})