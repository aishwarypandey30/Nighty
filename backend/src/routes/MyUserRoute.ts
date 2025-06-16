import express from "express";
import MyUserController from "../controllers/MyUserController";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

// /api/my/user
router.post("/",  (req, res, next) => {
  MyUserController.createCurrentUser(req, res);
});

export default router;
