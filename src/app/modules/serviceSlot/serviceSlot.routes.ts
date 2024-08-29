import { Router } from "express";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../signUpUser/signUpUser.constants";
import { CarBookingSlotValidation } from "./serviceSlot.validation";
import { CarBookingSlotController } from "./serviceSlot.controller";

const router = Router();

router.post(
  "/",
  Auth(USER_ROLE.admin),
  ValidationRequest(
    CarBookingSlotValidation.createServiceSlotsValidationSchema,
  ),
  CarBookingSlotController.createServiceSlot,
);

router.get("/:id", CarBookingSlotController.getAllServiceSlots);

router.get(
  "/availability",
  CarBookingSlotController.getAllAvailableServiceSlots,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin),
  ValidationRequest(CarBookingSlotValidation.updateServiceSlotValidationSchema),
  CarBookingSlotController.updateServiceSlotStatus,
);

export const ServiceSlotRoutes = router;
