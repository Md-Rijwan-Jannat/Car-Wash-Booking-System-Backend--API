import { Router } from "express";
import { CarServiceRoutes } from "../modules/carService/carService.routes";
import { SignUpUserRoutes } from "../modules/signUpUser/signUpUser.routes";
import { CarBookingSlotRoutes } from "../modules/carBookingSlot/carBookingSlot.routes";
import {
  CarServiceBookingRoutes,
  MyCarServiceBookingRoutes,
} from "../modules/carServiceBooking/carServiceBooking.routes";
import { AuthLoginRoutes } from "../modules/auth/auth.routes";
import { websiteReviewRoutes } from "../modules/websiteReview/websiteReview.routes";

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
    routeFile: CarBookingSlotRoutes,
  },
  {
    path: "/bookings",
    routeFile: CarServiceBookingRoutes,
  },
  {
    path: "/my-bookings",
    routeFile: MyCarServiceBookingRoutes,
  },
  {
    path: "/my-bookings",
    routeFile: MyCarServiceBookingRoutes,
  },
  {
    path: "/website-reviews",
    routeFile: websiteReviewRoutes,
  },
  {
    path: "/auth",
    routeFile: AuthLoginRoutes,
  },
];

appRoutesModel.forEach((route) => router.use(route.path, route.routeFile));

export const Routes = router;
