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

router.get("/users", Auth(USER_ROLE.admin), SignUpUserController.getAllUser);
router.get("/admins", Auth(USER_ROLE.admin), SignUpUserController.getAllAdmin);

router.get(
  "/:email",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  SignUpUserController.getUser,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.user),
  ValidationRequest(SignUpValidation.updateSignUpValidationSchema),
  SignUpUserController.updateUserAccount,
);

export const SignUpUserRoutes = router;
