const { success, error, validation } = require("../response");
const pg = require("../util/DB");
var bcrypt = require('bcryptjs');
const Student = require("../model/student.model");


//? add students

exports.addStudent = async(req,res)=>{
    
    try {
        const {
          fullname,
          dob,
          number,
          gender,
          email,
          password,
          address,
          city,
          state,
          pincode,
          semester,
          enrollmentno,
          roleid,
          deptid,
        } = req.body;
    
        const student = await Student.findOne({ where: { email: email } });
        if (student) {
          res
            .status(409)
            .json(error("User Already exits", res.statusCode));
        } else {
            Student.create({
            fullname: fullname,
            dob: dob,
            number: number,
            gender: gender,
            email: email,
            password: await bcrypt.hash(password, 10),
            address: address,
            city: city,
            state: state,
            pincode: pincode,
            semester:semester,
          enrollmentno:enrollmentno,
            roleid: roleid,
            deptid: deptid,
          })
            .then((result) => {
              res
                .status(200)
                .json(success("Student Added successfully", result, res.statusCode));
            })
            .catch((error) => {
              throw error;
            });
        }
      } catch (error) {
        return error;
      }
}


//? student Login
exports.studentLogin= async(req,res)=>{
    try {
        const student= await Student.findOne({where:{email:req.body.email,isdeleted:0}})
       
        if(student){
          const validatePassword = await bcrypt.compare(req.body.password,student.password)
          if(validatePassword){
              res.status(200).json(success("Student login successful", student, res.statusCode))
          }else{
              res.status(401).json(error("Invalid password",res.statusCode))
          }
        }else{
          res.status(404).json(error("Student Not Found",res.statusCode));
        }
          
      } catch (error) {
          throw error;
      }
}


//? student list

exports.getStudentList = async(req,res)=>{
    try {
        Student.findAll()
          .then((student) => {
            res.status(200).json(success("List of Students", student, res.statusCode));
          })
          .catch((error) => {
            res.status(400).json(error("no Student found", res.statusCode));
          });
      } catch (error) {
        throw error;
      }
}

//?get Studnet by id 
exports.getStudentById=async(req,res)=>{
    try {
        const studid = parseInt(req.params.studid);
        Student.findOne({ where: { studid: studid } })
          .then((student) => {
            if (!student) {
              res.status(404).json(error("no Student found", res.statusCode));
            } else {
              res.status(200).json(success("Student by ID", student, res.statusCode));
            }
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        return error;
      }
}

//? Student Update
exports.updateStudent = async (req, res) => {
    try {
        const {
            studid,
            fullname,
            dob,
            number,
            gender,
            email,
            password,
            address,
            city,
            state,
            pincode,
            semester,
            enrollmentno,
            roleid,
            deptid,
          } = req.body;
      await Student.update(
        {
          fullname: fullname,
          dob: dob,
          number: number,
          gender: gender,
          email: email,
          password: await bcrypt.hash(password, 10),
          address: address,
          city: city,
          state: state,
          pincode: pincode,
          semester:semester,
          enrollmentno:enrollmentno,
          roleid: roleid,
          deptid: deptid,
        },
        { where: { studid: studid } }
      ).then((user) => {
        Student.findOne({ where: { studid: studid } }).then((updateStudent) => {
          if (updateStudent) {
            res
              .status(200)
              .json(success("Student data updated", updateStudent, res.statusCode));
          } else {
            res.status(400).json(error("Student not updated", res.statusCode));
          }
        });
      });
    } catch (error) {
      throw error;
    }
  };

  exports.deleteStudent = async(req,res)=>{
    try {
      await  Student.update({
            isdeleted:1
        },{where:{studid:req.body.studid}}).then(user=>{
                User.findOne({where:{studid:req.body.studid,isdeleted:1}}).then(deletedUser=>{
                   if(!deletedUser){
                        res.status(400).json("Deleted user not found",res.statuscode);
                   }else{
                    res.status(200).json(success("deleted user",deletedUser,res.statuscode))
                   }
                   
                   
                })
        })
    } catch (error) {
        throw error;
    }
}