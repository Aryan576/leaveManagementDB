const { success, error, validation } = require("../response");
const pg = require("../util/DB");
var bcrypt = require("bcryptjs");
const Leave = require("../model/leave.model");
const Student = require("../model/student.model");

//? addLeave both for teacher and Student
exports.addLeave = async (req, res) => {
  try {
    const {
      leavetype,
      leavefrom,
      leaveto,
      noofdays,
      leavereason,
      deptid,
      studid,
      userid,
      statusid,
    } = req.body;
    Leave.create({
      leavetype: leavetype,
      leavefrom: leavefrom,
      leaveto: leaveto,
      noofdays: noofdays,
      leavereason: leavereason,
      deptid: deptid,
      studid: studid,
      userid: userid,
      statusid: statusid,
    })
      .then((result) => {
        res.status(200).json(success("Leave Submited", result, res.statuscode));
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

//? getLeave for Student MCA Department
exports.getmcastudent = async(req, res) => {
  Leave.findAll({
    where: { statusid: 2, deptid: 4 },
    include: [{ model: Student, required: true, attributes: ["fullname"] }],
  }).then((result) => {
    res
      .status(200)
      .json(success("List of Pending MCA Student", result, res.statuscode));
  });
};
//?get student approved list
exports.getmcastudentapproved = async(req, res) => {
    Leave.findAll({
      where: { statusid: 1, deptid: 4 },
      include: [{ model: Student, required: true, attributes: ["fullname"] }],
    }).then((result) => {
      res
        .status(200)
        .json(success("List of MCA Student Accepted", result, res.statuscode));
    });
  };
  //?get student Rejected list
exports.getmcastudentreject = async(req, res) => {
    Leave.findAll({
      where: { statusid: 3, deptid: 4 },
      include: [{ model: Student, required: true, attributes: ["fullname"] }],
    }).then((result) => {
      res
        .status(200)
        .json(success("List of MCA Student Rejected", result, res.statuscode));
    });
  };

  //?update studetn leave status to accept
  exports.acceptStudent = async(req,res)=>{
    const{leaveid}=req.body
    await Leave.update({ statusid: 1},{where:{leaveid:leaveid}}).then(result=>{
        res.status(200).json("Leave accepted",result,res.statuscode);
    })

  }

  //?update studetn leave status to Rejected
  exports.rejectStudent = async(req,res)=>{
    const{leaveid}=req.body
    await Leave.update({ statusid: 3},{where:{leaveid:leaveid}}).then(result=>{
        res.status(200).json("Leave accepted",result,res.statuscode);
    })

  }


