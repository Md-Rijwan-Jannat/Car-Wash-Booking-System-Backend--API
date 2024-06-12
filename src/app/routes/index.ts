import express from "express";
import { CarServiceRoutes } from "../modules/carService/carService.routes";
import { SignUpRoutes } from "../modules/signUp/signUpUser.routes";
import { CarBookingSlotRoutes } from "../modules/carBookingSlot/carBookingSlot.routes";

const router = express.Router();

const appRoutesModel = [
  {
    path: "/auth",
    routeFile: SignUpRoutes,
  },
  {
    path: "/services",
    routeFile: CarServiceRoutes,
  },
  {
    path: "/slots",
    routeFile: CarBookingSlotRoutes,
  },
];

appRoutesModel.forEach((route) => router.use(route.path, route.routeFile));

export const Routes = router;
