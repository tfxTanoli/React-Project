import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import express from 'express';
import adminRouter from "./routes/cruds.js";
import userRouter from "./routes/users.js";
import loginRouter from "./routes/sign-in.js";
import router from "./routes/products.js";

const app = express();

const url = "mongodb+srv://usman:tfxUsman124@cluster0.sroacgg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
        console.log("Connected to the database");
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })

    app.use(cors());
    app.use(bodyParser.json({extended : true}));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use("/admin",adminRouter);
    app.use("/",router);
    app.use("/signup",userRouter);
    app.use("/sign-in",loginRouter);