import { Project } from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ owner: req.user?._id });
  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

const addProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(400, "All fields are required!");
  }

  const project = await Project.create({
    title,
    description,
    owner: req.user,
  });

  await project.save();

  return res
    .status(201)
    .json(new ApiResponse(200, project, "Project created successfully"));
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    throw new ApiError(400, "No Project ID provided");
  }

  const deletedProject = await Project.findByIdAndDelete(projectId);
  return res.status(200).json(new ApiResponse(200, deletedProject));
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(400, "All fields are required");
  }

  const project = await Project.findByIdAndUpdate(
    projectId,
    { $set: { title, description } },
    { new: true }
  );

  if (!project) {
    throw new ApiError(400, "No project found to be updated");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, project, "Project details updated successfully")
    );
});

export { getProjects, addProject, deleteProject, updateProject };
