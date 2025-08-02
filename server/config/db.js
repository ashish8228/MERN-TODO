import mongoose from "mongoose";


export const ConnectDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected : ${conn.connection.host}`);
    }
    catch (err) {
        console.log("Error " +err);
        process.exit(1);

    }
}