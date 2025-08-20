import express from 'express'
import { get_friends, get_messages } from '../controllers/chatcontroller.js';
import { check_room } from '../middlewares/check_room.js';

const chatrouter = express.Router();

chatrouter.get('/get-friends', get_friends)

chatrouter.post('/get-messages', check_room , get_messages)

export default chatrouter;