import express from 'express'
import { get_username } from '../controllers/servicecontroller.js';

const service_router = express.Router();

service_router.get('/get-name', get_username);


export default service_router;