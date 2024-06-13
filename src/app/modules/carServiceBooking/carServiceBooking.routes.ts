import { Router } from "express";
import { CarServiceBookingController } from "./carServiceBooking.controller";
import { CarBookingValidation as CarServiceBookingValidation } from "./carServiceBooking.validation";
import { ValidationRequest } from "../../middlewares/ValidationRequest";

const router = Router();

router.post(
  "/",
  ValidationRequest(
    CarServiceBookingValidation.createCarServiceBookingValidationSchema,
  ),
  CarServiceBookingController.createCarServiceBooking,
);

router.get("/", CarServiceBookingController.getAllCarServiceBooking);

router.get("/", CarServiceBookingController.getAllMyCarServiceBooking);

export const CarServiceBookingRoutes = router;
export const MyCarServiceBookingRoutes = router;
