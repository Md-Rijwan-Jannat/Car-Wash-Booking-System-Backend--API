import { Router } from "express";
import { WebsiteReviewController } from "./websiteReview.controller";
import { ValidationRequest } from "../../middlewares/ValidationRequest";
import { websiteReviewValidationSchema } from "./websiteReview.validation";
import { Auth } from "../../middlewares/Auth";
import { USER_ROLE } from "../signUpUser/signUpUser.constants";

const router = Router();

router.post(
  "/create-website-review",
  Auth(USER_ROLE.user),
  ValidationRequest(websiteReviewValidationSchema),
  WebsiteReviewController.createWebsiteReview,
);

router.get("/", WebsiteReviewController.getAllWebsiteReview);

export const websiteReviewRoutes = router;
