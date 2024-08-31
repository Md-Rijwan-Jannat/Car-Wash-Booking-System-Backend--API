import { Router } from "express";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../signUpUser/signUpUser.constants";
import { CarBookingSlotValidation } from "./serviceSlot.validation";
import { ServicesSlotsController } from "./serviceSlot.controller";

const router = Router();

router.post(
  "/",
  Auth(USER_ROLE.admin),
  ValidationRequest(
    CarBookingSlotValidation.createServiceSlotsValidationSchema,
  ),
  ServicesSlotsController.createServiceSlot,
);

router.get("/:id", ServicesSlotsController.getServiceAllSlots);

router.get(
  "/availability",
  ServicesSlotsController.getAllAvailableServiceSlots,
);

router.get(
  "/",
  Auth(USER_ROLE.admin),
  ServicesSlotsController.getAllServiceSlots,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin),
  ValidationRequest(CarBookingSlotValidation.updateServiceSlotValidationSchema),
  ServicesSlotsController.updateServiceSlotStatus,
);

export const ServiceSlotRoutes = router;
