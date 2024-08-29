import { Router } from "express";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../signUpUser/signUpUser.constants";
import { ServiceSlotBookingController } from "./serviceSlotBooking.controller";
import { ServiceSlotBookingValidation } from "./serviceSlotBooking.validation";

const router_1 = Router();
const router_2 = Router();

router_1.post(
  "/",
  Auth(USER_ROLE.user),
  ValidationRequest(
    ServiceSlotBookingValidation.createServiceSlotBookingValidationSchema,
  ),
  ServiceSlotBookingController.createServiceSlotBooking,
);

router_1.get(
  "/",
  Auth(USER_ROLE.admin),
  ServiceSlotBookingController.getAllServiceSlotBooking,
);

router_2.get(
  "/",
  Auth(USER_ROLE.user),
  ServiceSlotBookingController.getAllMyServiceSlotBooking,
);

export const ServiceSlotBookingRoutes = router_1;
export const MyServiceSlotBookingRoutes = router_2;
