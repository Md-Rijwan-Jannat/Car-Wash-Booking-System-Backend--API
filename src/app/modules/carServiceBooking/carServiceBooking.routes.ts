import { Router } from "express";
import { CarServiceBookingController } from "./carServiceBooking.controller";
import { CarBookingValidation as CarServiceBookingValidation } from "./carServiceBooking.validation";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../signUpUser/signUpUser.constants";

const router_1 = Router();
const router_2 = Router();

router_1.post(
  "/",
  Auth(USER_ROLE.user),
  ValidationRequest(
    CarServiceBookingValidation.createCarServiceBookingValidationSchema,
  ),
  CarServiceBookingController.createCarServiceBooking,
);

router_1.get(
  "/",
  Auth(USER_ROLE.admin),
  CarServiceBookingController.getAllCarServiceBooking,
);

router_2.get(
  "/",
  Auth(USER_ROLE.user),
  CarServiceBookingController.getAllMyCarServiceBooking,
);

export const CarServiceBookingRoutes = router_1;
export const MyCarServiceBookingRoutes = router_2;
