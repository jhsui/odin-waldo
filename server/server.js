import express from "express";
import router from "./router.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://odin-waldo-client.onrender.com",
    ],
  }),
);

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
