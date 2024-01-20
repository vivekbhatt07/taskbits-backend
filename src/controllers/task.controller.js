import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getTasks = asyncHandler(async (req, res) => {});

const addTask = asyncHandler(async (req, res) => {
  //   const { projectId } = req.params;
  console.log(req.params);
  const { title, description, priority, variant, dueDate, labels } = req.body;
  console.log(title);
  if (!projectId) {
    throw new ApiError(400, "Project ID not found");
  }

  const task = await Task.create({
    title,
    description,
    priority,
    variant,
    dueDate,
    project: projectId,
    labels,
  });

  await task.save();

  return res
    .status(201)
    .json(new ApiResponse(200, task, "Task created successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {});

const updateTask = asyncHandler(async (req, res) => {});

export { getTasks, addTask, deleteTask, updateTask };
