import express from  "express";
import dotenv from "dotenv";
import {ConnectDb} from "./config/db.js";
import todoroutes from "./routes/Todo.routes.js";
import path from "path"
const PORT = process.env.PORT || 4001;

const app = express ();

dotenv.config();

app.use(express.json());

app.use("/api/todos",todoroutes)

const __dirname = Path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/client/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, "client","dist","index.html"));
    })
}

app.listen(PORT, ()=>{
    ConnectDb();
    console.log("Server listening at port number 4001");
})