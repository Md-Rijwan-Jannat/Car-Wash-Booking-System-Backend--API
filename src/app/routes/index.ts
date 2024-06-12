import express from "express";
import { ServiceRoutes } from "../modules/service/service.routes";

const router = express.Router();

const appRoutesModel = [
  {
    path: "/services",
    routeFile: ServiceRoutes,
  },
];

appRoutesModel.forEach((route) => router.use(route.path, route.routeFile));

export const Routes = router;
