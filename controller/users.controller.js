const { success, error, validation } = require("../response");
const pg = require("../DB");
var bcrypt = require('bcryptjs');
const { response } = require("express");

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

//? userLogin 

exports.userLogin = async(req,res)=>{
  const users= await  pg.query("select * from users where email=$1",[req.body.email])
  
      if(users.rows.length<=0)
     {
        res.status(404).json(error(req.body.email+"does not exists",res.statusCode))
     }else{
  
       if( await bcrypt.compare(req.body.password,users.rows[0].password)){
               
                  return  res.status(200).json(success(users.rows[0].fullname+" Login Successfully",users.rows,res.statusCode))
                }else{
                  return   res.status(201).json(error("Wrong credentials",res.statusCode));
                }
        } 
            
            
}
 
   
 

 //? List Users
exports.usersList = async (req, res) => {

    try {

        pg.query('select * from users', (error, result) => {

            if (error) {
                throw error;
            } else {
                res.status(200).json(success("List of users", { data: result.rows }, res.statusCode));
            }
        })
    } catch (error) {
        return error;
    }
}

//? Get User by id
exports.GetUserById = async (req, res) => {

    try {
        const userid = parseInt(req.params.userid)

        pg.query('select * from users where userid = $1', [userid], (error, result) => {

            if (result.rows.length != 0) {
                res.status(200).json(success("Users ById", result.rows, res.statusCode))
            } else {
                res.status(400).json(error("No Data Found", res.statusCode))
            }
        })
    } catch (error) {
        return error;
    }
}

//? User Update
exports.userUpdate = async (req, res) => {

    try {
        const userid = parseInt(req.body.userid)
        const password = await bcrypt.hash(req.body.password, 10);
        const { fullname, phoneno, birthdate, gender, email, address, cityid, pincode, roleid, status, departmentid } = req.body;

        pg.query('update users set fullname=$1,phoneno=$2,birthdate=$3,gender=$4,email=$5,password=$6,address=$7,cityid=$8,pincode=$9,roleid=$10,status=$11,departmentid=$12 where userid=$13', [fullname, phoneno, birthdate, gender, email, password, address, cityid, pincode, roleid, status, departmentid,userid], (error, result) => {

            if (error) {
                throw error;
            } else {
                res.status(200).json(success("user Updated sucesffuly", { fullname, phoneno, birthdate, gender, email, password, address, cityid, pincode, roleid, status, departmentid,userid }, res.statusCode));
            }
        })
    } catch (error) {
        return error;
    }
}
