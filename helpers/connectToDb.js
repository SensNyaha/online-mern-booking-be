import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import path from "path";

configDotenv({path: path.resolve(process.cwd(), "..", ".env")});

async function connectToDb() {
    return mongoose.connect(process.env.MONGO_URL + "/market");
}

//, () => {
    // console.log(`Server started on the URI: ${process.env.MONGO_URL + "/market"}`);

export default connectToDb;