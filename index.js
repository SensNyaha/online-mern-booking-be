import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth.js";
import registerRouter from "./routes/register.js";
import connectToDb from "./helpers/connectToDb.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/register", registerRouter);

app.get("/api/", (req, res) => {
    res.send("Hello");
});

const PORT = process.env.PORT || 3001;

connectToDb().then(() => {
    console.log("Server connected to DB on address: " + process.env.MONGO_URL);
    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
    });
});
