import express from 'express'
import { get_requests, get_username, get_users } from '../controllers/servicecontroller.js';

const service_router = express.Router();

service_router.get('/get-name', get_username);

service_router.get('/get-users', get_users);

service_router.get('get-requests', get_requests)


export default service_router;