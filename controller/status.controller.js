const { success, error, validation } = require("../response");
const pg = require("../util/DB");
const Status = require("../model/status.model");


//?addStatus
exports.addStatus = async (req, res) => {
    try {
      const dept = await Status.findOne({
        where: { statusname: req.body.statusname },
      });
      if (dept) {
        res.status(201).json(error("Status already exists", res.statusCode));
      } else {
        await Status.create({ statusname: req.body.statusname })
          .then((Status) => {
            res
              .status(200)
              .json(success("Status created", Status, res.statusCode));
          })
          .catch((error) => {
            throw error;
          });
      }
    } catch (error) {
      throw error;
    }
  };
  //? List of Status
  exports.getStatus = async (req, res) => {
    try {
        Status.findAll().then((status) => {
        res
          .status(200)
          .json(success("List of Departments", status, res.statusCode));
      });
    } catch (error) {
      throw error;
    }
  };
  
  //? getStatus BYID
  exports.getStatusById = async (req, res) => {
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
  
  exports.updateStatus = async (req, res) => {
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
  
  exports.deleteStatus = async (req, res) => {
    try {
      const deptid = req.body.deptid;
      Department.destroy({where:{deptid:deptid}}).then(result=>{
          res.status(200).json(success("department deleted successfully",deptid,res.statusCode))
      })
     
    } catch (error) {
      throw error;
    }
  };