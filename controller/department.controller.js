const { success, error, validation } = require("../response");
const pg = require("../util/DB");
const Department = require("../model/department.model");


//?addDepartments
exports.addDepartment = async (req, res) => {
  try {
    const dept = await Department.findOne({
      where: { deptname: req.body.deptname },
    });
    if (dept) {
      res.status(201).json(error("Department already exists", res.statusCode));
    } else {
      await Department.create({ deptname: req.body.deptname })
        .then((Department) => {
          res
            .status(200)
            .json(success("Department created", Department, res.statusCode));
        })
        .catch((error) => {
          throw error;
        });
    }
  } catch (error) {
    throw error;
  }
};
//? List of Departments
exports.getDepartment = async (req, res) => {
  try {
    Department.findAll().then((dept) => {
      res
        .status(200)
        .json(success("List of Departments", dept, res.statusCode));
    });
  } catch (error) {
    throw error;
  }
};

//? getDepartment BYID
exports.getDepartmentById = async (req, res) => {
  try {
    const deptid = parseInt(req.params.deptid);
    Department.findOne({ where: { deptid: deptid } })
      .then((dept) => {
        res.status(200).json(success("Departmnet by Id", dept, res.statusCode));
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    Department.update(
      {
        deptname: req.body.deptname,
      },
      { where: { deptid: req.body.deptid } }
    ).then(dept=>{
        Department.findOne({where:{deptid:req.body.deptid}}).then(result=>{
            res.status(200).json(success("Updated Depatment",result,res.statusCode))
        })
    });
  } catch (error) {
    throw error;
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const deptid = req.body.deptid;
    Department.destroy({where:{deptid:deptid}}).then(result=>{
        res.status(200).json(success("department deleted successfully",deptid,res.statusCode))
    })
   
  } catch (error) {
    throw error;
  }
};
