import Tasks from '../models/tasks.model.js';
import { errorHandler } from '../utils/error.js';
import User from "../models/user.model.js";


// Helper function to permanently delete tasks older than 30 days
const permanentlyDeleteTask = async () => {
  const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
  await Tasks.deleteMany({ deletedAt: { $lt: thirtyDaysAgo } });
};

// Create a new task
export const createTask = async (req, res, next) => {
  const { title, description, status, dueDate, taskUserId } = req.body;
  
  // Check if the user exists
  const user = await User.findById(taskUserId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  if (req.user.role != 'admin') return res.status(401).json("Only admin can create tasks");

  try {
    const newTask = new Tasks({
      title,
      description,
      status,
      dueDate: new Date(dueDate),
      taskUserId,
    });

    await newTask.save();
    res.status(201).json({ success: true, message: "Task created" });

  } catch (error) {
    next(errorHandler(500, error.message)); 
  }
};

// Update an existing task
export const updateTask = async (req, res, next) => {
  // if (req.user.role != 'admin') return res.status(401).json("Only admin can edit tasks");

  const taskId = req.params.id;
  const { title, description, status, dueDate, taskUserId } = req.body;

  try {
    const task = await Tasks.findByIdAndUpdate(taskId, {
      title,
      description,
      status,
      dueDate,
      taskUserId,
    }, { new: true });

    if (!task) {
      return next(errorHandler(404, 'Task not found'));
    }

    res.status(200).json("Task updated");

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// Read all tasks (excluding those soft-deleted)
export const readTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.find({ deletedAt: null });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'Tasks not found!' });
    }

    res.status(200).json(tasks);

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// Read tasks by user ID (excluding those soft-deleted)
export const readTasksByUserId = async (req, res, next) => {
  try {
    // Extract userId from the URL parameters
    const userId = req.params.id;

    // Find tasks where taskUserId matches userId and deletedAt is null
    const tasks = await Tasks.find({ taskUserId: userId, deletedAt: null });

    // If no tasks are found, return a 404 response
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'Tasks not found!' });
    }

    // If tasks are found, return them with a 200 status
    res.status(200).json(tasks);

  } catch (error) {
    // If an error occurs, pass it to the error handler middleware
    next(errorHandler(500, error.message));
  }
};

// Soft delete a task
export const softDeleteTask = async (req, res, next) => {
  if (req.user.role != 'admin') return res.status(401).json("Only admin can delete tasks");

  try {
    const taskId = req.params.id;
    const task = await Tasks.findByIdAndUpdate(taskId, { deletedAt: new Date() }, { new: true });

    if (!task) {
      return next(errorHandler(404, 'Task not found'));
    }

    // Trigger permanent deletion of tasks older than 30 days
    await permanentlyDeleteTask();

    return res.status(200).json("Task successfully soft deleted");

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json("Only admin can fetch all users");
  }

  // Return all users in the database who are not admins
  try {
    const users = await User.find(
      { role: { $ne: "admin" }, isVerified: "YES" },
      "username fullname role email avatar"
    );
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    next(errorHandler(500, error.message));
  }
};
