import { Router } from "express";
import { CarServiceController } from "./carService.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { CarServiceValidation } from "./carService.validation";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../signUpUser/signUpUser.constants";

const router = Router();

router.post(
  "/",
  Auth(USER_ROLE.admin),
  ValidationRequest(CarServiceValidation.createCarServiceValidationSchema),
  CarServiceController.createCarService,
);

router.get("/:id", CarServiceController.getSingleCarService);

router.get("/", CarServiceController.getAllCarService);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin),
  ValidationRequest(CarServiceValidation.updateCarServiceValidationSchema),
  CarServiceController.updateSingleCarService,
);

router.delete(
  "/:id",
  Auth(USER_ROLE.admin),
  CarServiceController.deleteSingleCarService,
);

export const CarServiceRoutes = router;
