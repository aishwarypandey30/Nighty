import express, { Request, Response } from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();
router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  (req: Request, res: Response) => {
    OrderController.createCheckoutSession(req, res);
  }
);

router.post("/checkout/webhook", (req: Request, res: Response) => {
  OrderController.stripeWebhookHandler(req, res);
});

export default router;
