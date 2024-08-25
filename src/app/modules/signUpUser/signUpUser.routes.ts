import { Router } from "express";
import { SignUpUserController } from "./signUpUser.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { SignUpValidation } from "./signUpUser.validation";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "./signUpUser.constants";

const router = Router();

router.post(
  "/signup",
  ValidationRequest(SignUpValidation.createSignUpValidationSchema),
  SignUpUserController.signUpUserAccount,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  ValidationRequest(SignUpValidation.updateSignUpValidationSchema),
  SignUpUserController.updateUserAccount,
);

export const SignUpUserRoutes = router;
