import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get(
  "/order",
  jwtCheck,
  jwtParse,
  (req,res) => {
  MyRestaurantController.getMyRestaurantOrders(req,res);}
);

router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  (req,res) => {
    MyRestaurantController.updateOrderStatus(req,res);}
);

router.get("/", jwtCheck, jwtParse, (req,res) => {
  MyRestaurantController.getMyRestaurant(req,res);
});

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  (req : Request,res : Response) =>{
    MyRestaurantController.createMyRestaurant(req,res)
  }
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  (req : Request,res : Response) =>{
    MyRestaurantController.updateMyRestaurant(req,res)
  }
);

export default router;
