import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/user.validator";

const router = Router();

router.route("/register").post(userRegisterValidator(), registerUser);
router.route("/login").post(userLoginValidator(), loginUser);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/logout").post(verifyJWT, logoutUser);
export default router;
