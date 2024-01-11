import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import { User } from "./models/user.model";
import { ApiError } from "./utils/ApiError";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN!,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

try {
  passport.serializeUser((user: any, next) => {
    try {
      next(null, user._id);
    } catch (error) {
      next(
        new ApiError(500, "Error during user serialization: " + error),
        null
      );
    }
  });

  passport.deserializeUser(async (id, next) => {
    try {
      console.log("deserialization started");
      const user = await User.findById(id);
      if (user) {
        console.log("user found", user);
        next(null, user);
      } else next(new ApiError(404, "User does not exist"), null);
    } catch (error) {
      next(
        new ApiError(
          500,
          "Something went wrong while deserializing the user. Error: " + error
        ),
        null
      );
    }
  });
} catch (error) {
  console.error("PASSPORT ERROR: ", error);
}
app.use(passport.initialize());
app.use(passport.session());

import userRouter from "./routes/user.route";
import categoryRouter from "./routes/category.route";
import productRouter from "./routes/product.route";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);

export { app };
