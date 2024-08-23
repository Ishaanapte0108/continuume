import express from 'express';
import { createTask, updateTask, softDeleteTask, readTasks, readTasksByUserId, getAllUsers } from '../controllers/tasks.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createTask);
router.put('/update/:id', verifyToken, updateTask);
router.get('/read', verifyToken, readTasks);
router.get('/read/:id', verifyToken, readTasksByUserId);
router.delete('/delete/:id', verifyToken, softDeleteTask);
router.get('/users', verifyToken, getAllUsers);


export default router;
