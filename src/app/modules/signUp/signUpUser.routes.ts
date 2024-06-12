import express from "express";
import { SignUpUserController } from "./signUpUser.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { SignUpValidation } from "./signUpUser.validation";

const router = express.Router();

router.post(
  "/signup",
  ValidationRequest(SignUpValidation.createSignUpValidationSchema),
  SignUpUserController.signUpUserAccount,
);

export const SignUpRoutes = router;
