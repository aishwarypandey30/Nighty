import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import {
  validateMyUserRequest,
  handleValidationErrors,
} from "../middleware/validation";
import * as myUserController from "../controllers/MyUserController";

const router = express.Router();

router.get("/api/my/user", jwtCheck, jwtParse, myUserController.getCurrentUser);
router.post(
  "/api/my/user",
  jwtCheck,
  jwtParse,
  myUserController.createCurrentUser
);
router.put(
  "/api/my/user",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  handleValidationErrors,
  myUserController.updateCurrentUser
);

export default router;
