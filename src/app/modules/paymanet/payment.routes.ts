import { Router } from "express";
import { PaymentController } from "./payment.controller";
const router = Router();

router.post("/conformation", PaymentController.paymentConformation);

export const PaymentRoutes = router;
