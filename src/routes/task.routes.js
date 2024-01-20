import { Router } from "express";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("").get(verifyJWT, getTasks);
router.route("/").post(verifyJWT, addTask);
router.route("/:taskId").delete(verifyJWT, deleteTask);
router.route("/:taskId").patch(verifyJWT, updateTask);

export default router;
