const { success, error, validation } = require("../response");
const pg = require("../util/DB");
const Role = require("../model/role.model");

//! addroles
exports.addRole = async (req, res) => {
  
  try {
    const roles = await Role.findOne({
      where: { rolename: req.body.rolename },
    });
    if (roles) {
      res.status(201).json(error("roles already exists", res.statusCode));
    } else {
      await Role.create({ rolename: req.body.rolename })
        .then(Role => {
          res
            .status(200)
            .json(success("Roles are created", Role, res.statusCode));
        })
        .catch((error) => {
          throw error;
        });
    }
  } catch (error) {
    throw error;
  }
};

//? getrols
exports.getRoles = async (req, res) => {

  try {
    Role.findAll().then(role=>{
      console.log(role);
      res.status(200).json(success("List of Role",role,res.status))
    })
  } catch (error) {
    throw error;
  }
};

//?geroles byID
exports.getRolesByID = async (req, res) => {
try{
    const id = parseInt(req.params.roleid);
   
    
    Role.findOne({where:{roleid:id}}).then(result => {
      console.log(result);  
      res.status(200).json(success("list of Role By ID",result,res.statusCode));
    }).catch(err => {
        throw err;
    })
  
}catch(err) {
    throw err;
}
};

//?update role
exports.updateRole = async (req, res) => {
 

  try{
    Role.update({
        rolename:req.body.rolename
    },{
        where:{roleid:req.body.roleid}
    }).then(result => { 
      Role.findOne({where:{roleid:req.body.roleid}}).then(result=>{
        res.status(200).json(success("Updated Role",result,res.statusCode));
      })
       
    }).catch(err => {
        throw err;
    })
}catch(err) {
    throw err;
}

};

//?delete role
exports.deleteRole = async (req, res) => {
  
  try {
    const id = parseInt(req.params.roleid);
    Role.destroy({ where: { roleid: id } }).then(result => {
      res
      .status(200)
      .json(success("role deleted", { roleid }, res.statusCode));
    })
} catch (err) {
    throw err;
}

};
