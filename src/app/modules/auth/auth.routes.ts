import { Router } from "express";
import { AuthLoginController } from "./auth.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { UserLoginValidation } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  ValidationRequest(UserLoginValidation.userLoginValidationSchema),
  AuthLoginController.authLogin,
);

export const AuthLoginRoutes = router;
