import express from "express";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { CarBookingSlotValidation } from "./carBookingSlot.validation";
import { CarBookingSlotController } from "./carBookingSlot.controller";

const router = express.Router();

router.post(
  "/",
  ValidationRequest(
    CarBookingSlotValidation.createCarBookingSlotValidationSchema,
  ),
  CarBookingSlotController.createCarBookingSlot,
);

export const CarBookingSlotRoutes = router;
