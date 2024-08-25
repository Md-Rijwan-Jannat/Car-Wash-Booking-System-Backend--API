import { Router } from "express";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { CarBookingSlotValidation } from "./carBookingSlot.validation";
import { CarBookingSlotController } from "./carBookingSlot.controller";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../signUpUser/signUpUser.constants";

const router = Router();

router.post(
  "/",
  Auth(USER_ROLE.admin),
  ValidationRequest(
    CarBookingSlotValidation.createCarBookingSlotValidationSchema,
  ),
  CarBookingSlotController.createCarBookingSlot,
);

router.get(
  "/availability",
  CarBookingSlotController.getAllAvailableCarBookingSlot,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin),
  ValidationRequest(
    CarBookingSlotValidation.updateBookingStatusValidationSchema,
  ),
  CarBookingSlotController.updateCarBookingStatus,
);

export const CarBookingSlotRoutes = router;
