import { Router } from "express";
import { CarServiceBookingController } from "./carServiceBooking.controller";
import { CarBookingValidation as CarServiceBookingValidation } from "./carServiceBooking.validation";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../signUpUser/signUpUser.constants";

const router = Router();

router.post(
  "/",
  Auth(USER_ROLE.user),
  ValidationRequest(
    CarServiceBookingValidation.createCarServiceBookingValidationSchema,
  ),
  CarServiceBookingController.createCarServiceBooking,
);

router.get(
  "/",
  Auth(USER_ROLE.admin),
  CarServiceBookingController.getAllCarServiceBooking,
);

router.get(
  "/",
  Auth(USER_ROLE.user),
  CarServiceBookingController.getAllMyCarServiceBooking,
);

export const CarServiceBookingRoutes = router;
export const MyCarServiceBookingRoutes = router;
