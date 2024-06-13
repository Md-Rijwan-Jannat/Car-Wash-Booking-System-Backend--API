import { Router } from "express";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { CarBookingSlotValidation } from "./carBookingSlot.validation";
import { CarBookingSlotController } from "./carBookingSlot.controller";

const router = Router();

router.post(
  "/",
  ValidationRequest(
    CarBookingSlotValidation.createCarBookingSlotValidationSchema,
  ),
  CarBookingSlotController.createCarBookingSlot,
);

router.get(
  "/availability",
  CarBookingSlotController.getAllAvailableCarBookingSlot,
);

export const CarBookingSlotRoutes = router;
