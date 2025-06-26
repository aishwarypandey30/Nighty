import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import {
  validateMyUserRequest,
  handleValidationErrors,
} from "../middleware/validation";
import * as myUserController from "../controllers/MyUserController";
import { asyncHandler } from "../middleware/asyncMiddleware";

const router = express.Router();

router.get(
  "/",
  jwtCheck,
  asyncHandler(jwtParse),
  asyncHandler(myUserController.getCurrentUser)
);
router.post(
  "/",
  jwtCheck,
  asyncHandler(jwtParse),
  asyncHandler(myUserController.createCurrentUser)
);
router.put(
  "/",
  jwtCheck,
  asyncHandler(jwtParse),
  asyncHandler(myUserController.updateCurrentUser)
);

export default router;
