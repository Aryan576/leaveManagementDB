const { success, mistake, validation } = require("../response");
const pg = require("../DB");
var bcrypt = require('bcryptjs');

//? User Signup
exports.userSignup=async(req,res)=>{
    
    
    try{
        const password = await  bcrypt.hash(req.body.password,10);
        const {fullname,dob,gender,email,address,roleid,status,deptid,pincode,phonenumber,cityid}=req.body;
        
        pg.query('insert into users(fullname,dob,gender,email,password,address,roleid,status,deptid,pincode,phonenumber,cityid) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[fullname,dob,gender,email,password,address,roleid,status,deptid,pincode,phonenumber,cityid],(error,result)=>{
           
            if(error){
                throw error;
            }else{
                res.status(200).json(success("user Signup sucesffuly",{fullname,dob,gender,email,password,address,roleid,status,deptid,pincode,phonenumber,cityid},res.statusCode));
            }
        })
    }catch(error){
            return error;
    }
}
