import { Router } from "express";
import {
  getProjects,
  addProject,
  deleteProject,
  updateProject,
} from "../controllers/project.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getProjects);
router.route("/").post(verifyJWT, addProject);
router.route("/:projectId").delete(verifyJWT, deleteProject);
router.route("/:projectId").patch(verifyJWT, updateProject);

export default router;
