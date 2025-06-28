import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

// /api/my/user
router.get("/", jwtCheck, jwtParse,(req,res,next) => {
  MyUserController.getCurrentUser(req,res)
})
router.post("/",jwtCheck, (req, res, next) => {
  MyUserController.createCurrentUser(req, res)
});
router.put("/",jwtCheck,jwtParse,validateMyUserRequest,(req: Request, res: Response, next: NextFunction) =>{
  MyUserController.updateCurrentUser(req, res)
});


export default router;