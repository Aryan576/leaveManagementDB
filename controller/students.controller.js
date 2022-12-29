const { success, mistake, validation } = require("../response");
const pg = require("../DB");
var bcrypt = require('bcryptjs');


//? add students

exports.addStudent = async(req,res)=>{
    
        try{
            const password = await  bcrypt.hash(req.body.password,10);
        const {fullname,phonenumber,dob,gender,email,address,cityid,roleid,status,deptid,sem,enrollmentno,pincode}=req.body;
        pg.query('insert into students (fullname,phonenumber,dob,gender,email,password,address,cityid,roleid,status,deptid,sem,enrollmentno,pincode) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',[fullname,phonenumber,dob,gender,email,password,address,cityid,roleid,status,deptid,sem,enrollmentno,pincode],(error,result)=>{
            if(error)
            {
                throw error;
            }else{
                res.status(200).json(success("Studetns added successfully",{fullname,phonenumber,dob,gender,email,password,address,cityid,roleid,status,deptid,sem,enrollmentno,pincode},res.statusCode))
            }
        })

        }catch(error){
            return error;
        }
}


//? student Login
exports.studentLogin= async(req,res)=>{
    try {
        const {email,password}=req.body;
         const users= await  pg.query("select * from users where email=$1",[email])
 
         const validCredentials = await bcrypt.compare(password,users.rows[0].password)
               
         if(validCredentials){
                    res.status(200).json(success("Student Login Successfully",users.rows,res.statusCode))
                }else{
                    res.status(400).json(mistake("Wrong credentials",res.statusCode));
                }

        
    } catch (error) {
        return error;
        
    }
}


//? student list

exports.getStudentList = async(req,res)=>{
    try {
        pg.query('select * from students',(error,result)=>{
            if(error){
                throw error;
            }else{
                res.status(200).json(success("List of students",result.rows,res.statusCode))
            }
        })
    } catch (error) {
        return error;
    }
}

//?get Studnet by id 
exports.getStudentById=async(req,res)=>{
    try {
        const studentid=parseInt(req.params.studentid);
        pg.query('select * from students where studentid=$1',[studentid],(error,result)=>{
            if(result.rows.length>0)
            {
                res.status(200).json(success("Data of Student ById",result.rows,res.statusCode))
            }else {
                res.status(404).json(mistake("No studetn exits",res.statusCode))
            }
        })

    } catch (error) {
        return error
    }
}