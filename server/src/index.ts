import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db/index";
import cors from "cors";
import userRouter from "./routes/user.route";
import categoryRouter from "./routes/category.route";
import productRouter from "./routes/product.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const origin: string = process.env.CORS_ORIGIN!;

app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);

async function main() {
  await connectDB();
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

main();
