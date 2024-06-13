import { Router } from "express";
import { CarServiceRoutes } from "../modules/carService/carService.routes";
import { SignUpUserRoutes } from "../modules/signUpUser/signUpUser.routes";
import { CarBookingSlotRoutes } from "../modules/carBookingSlot/carBookingSlot.routes";

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
];

appRoutesModel.forEach((route) => router.use(route.path, route.routeFile));

export const Routes = router;
