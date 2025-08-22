import express from 'express'
import { accept_request, active_request_count, cancel_request, get_requests, get_username, get_users, reject_request, send_request } from '../controllers/servicecontroller.js';

const service_router = express.Router();

service_router.get('/get-name', get_username);

service_router.get('/get-users', get_users);

service_router.get('/get-requests', get_requests)

service_router.post('/send-request', send_request)

service_router.patch('/accept-request', accept_request);

service_router.patch('/reject-request', reject_request)

service_router.delete('/cancel-request', cancel_request)

service_router.get('/active-requests', active_request_count)


export default service_router;