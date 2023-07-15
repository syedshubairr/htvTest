import { connect } from "mongoose";
import bodyParser from "body-parser";
import AuthRoutes from "./routes/auth.js";
import express from "express";
import { config } from "dotenv";
import cors from "cors";

const { urlencoded, json } = bodyParser;
config();

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

connect(
  "mongodb+srv://syedshubair8299:shahgee8299@cluster0.enmaigf.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/", AuthRoutes);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
