import { Router } from "express";
import { CarServiceController } from "./carService.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { CarServiceValidation } from "./carService.validation";

const router = Router();

router.post(
  "/",
  ValidationRequest(CarServiceValidation.createCarServiceValidationSchema),
  CarServiceController.createCarService,
);

router.get("/:id", CarServiceController.getSingleCarService);

router.get("/", CarServiceController.getAllCarService);

router.patch(
  "/:id",
  ValidationRequest(CarServiceValidation.updateCarServiceValidationSchema),
  CarServiceController.updateSingleCarService,
);

router.delete("/:id", CarServiceController.deleteSingleCarService);

export const CarServiceRoutes = router;
