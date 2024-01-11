import { Request, Response } from "express";
import connectDB from "./db/index";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT!;

app.get("/", (req: Request, res: Response) => {
  res.send("Jay Shree Ganesh");
});

async function main() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
main();
