import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import formRouter from './routes/form.route.js'
import chatRouter from './routes/chat.route.js'
import resourceRouter from './routes/resource.route.js'
import eventsRouter from './routes/events.route.js';
import universityRoutes from './routes/university.route.js'
import cookieParser from 'cookie-parser';
import messageRouter from './routes/message.route.js'
import tasksRouter from './routes/tasks.route.js'
import path from 'path'
import logger from '../logger.js';

dotenv.config();

// mongoose
//   .connect(process.env.MONGODB)
//   .catch((err) => {
//     logger.error(err);
//     console.log(err)
//   });
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json())
app.use(cookieParser())

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/form', formRouter)
app.use('/api/chat', chatRouter)
app.use('/api/resource', resourceRouter)
app.use('/api/events', eventsRouter)
app.use('/api/universities', universityRoutes);
app.use('/api/message',messageRouter)

app.use('/api/tasks', tasksRouter);


app.use(express.static (path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})


app.use((err, req, res, next) =>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
      "success": false,
      statusCode,
      message
    })
});