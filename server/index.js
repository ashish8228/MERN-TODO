import express from  "express";
import dotenv from "dotenv";
import {ConnectDb} from "./config/db.js";
import todoroutes from "./routes/Todo.routes.js";
const app = express ();

dotenv.config();


app.use(express.json());


app.use("/api/todos",todoroutes)

app.listen(4001,()=>{
    ConnectDb();
    console.log("Server listening at port number 4001");
})