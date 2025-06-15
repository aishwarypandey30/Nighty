import express from "express";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();

// /api/my/user
router.post("/", (req, res, next) => {
  MyUserController.createCurrentUser(req, res)
})


export default router;