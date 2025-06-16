import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// /api/my/user
router.post("/",jwtCheck, (req, res, next) => {
  MyUserController.createCurrentUser(req, res)
});
router.put("/",(req,res,next) =>{
  MyUserController.updateCurrentUser(req, res)
});


export default router;