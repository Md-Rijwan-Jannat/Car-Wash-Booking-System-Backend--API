import { Router } from "express";
import { AuthLoginController } from "./auth.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { UserAuthValidation } from "./auth.validation";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../signUpUser/signUpUser.constants";

const router = Router();

router.post(
  "/login",
  ValidationRequest(UserAuthValidation.userLoginValidationSchema),
  AuthLoginController.authLogin,
);

router.post(
  "/change-password",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  ValidationRequest(UserAuthValidation.userChangePasswordValidationSchema),
  AuthLoginController.passwordChange,
);

router.post(
  "/refresh-token",
  ValidationRequest(UserAuthValidation.refreshTokenValidationSchema),
  AuthLoginController.refreshToken,
);

export const AuthLoginRoutes = router;
