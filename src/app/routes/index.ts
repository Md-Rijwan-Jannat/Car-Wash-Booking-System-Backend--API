import { Router } from "express";
import { CarServiceRoutes } from "../modules/carService/carService.routes";
import { SignUpUserRoutes } from "../modules/signUpUser/signUpUser.routes";
import { ServiceSlotRoutes } from "../modules/serviceSlot/serviceSlot.routes";
import { AuthLoginRoutes } from "../modules/auth/auth.routes";
import { websiteReviewRoutes } from "../modules/websiteReview/websiteReview.routes";
import {
  MyServiceSlotBookingRoutes,
  ServiceSlotBookingRoutes,
} from "../modules/serviceSlotBooking/serviceSlotBooking.routes";
import { PaymentRoutes } from "../modules/paymanet/payment.routes";

const router = Router();

const appRoutesModel = [
  {
    path: "/auth",
    routeFile: SignUpUserRoutes,
  },
  {
    path: "/services",
    routeFile: CarServiceRoutes,
  },
  {
    path: "/slots",
    routeFile: ServiceSlotRoutes,
  },
  {
    path: "/bookings",
    routeFile: ServiceSlotBookingRoutes,
  },
  {
    path: "/my-bookings",
    routeFile: MyServiceSlotBookingRoutes,
  },
  {
    path: "/website-reviews",
    routeFile: websiteReviewRoutes,
  },
  {
    path: "/auth",
    routeFile: AuthLoginRoutes,
  },
  {
    path: "/payment",
    routeFile: PaymentRoutes,
  },
];

// Register routes
appRoutesModel.forEach((route) => router.use(route.path, route.routeFile));

export const Routes = router;
