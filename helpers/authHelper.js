import bcrypt from "bcrypt"

// create password
export const hashPassword=async (password)=>{
    try{
       const hashedPassword=await bcrypt.hashSync(password,12);
       return hashedPassword;
    }catch(err){
        console.log(err);
    }
}
// compare password
export const comparePassword=async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
};