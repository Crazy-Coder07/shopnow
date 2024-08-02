import mongoose from "mongoose";
import colors from "colors";

const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.DATABASE);
        console.log(`Connected to DATABASE successfully ${conn.connection.host}`)
    }catch(err){
        console.log("Error in DB",err);
    }
 }
 export default connectDB;