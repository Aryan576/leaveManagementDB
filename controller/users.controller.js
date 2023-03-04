const { success, error, validation } = require("../response");
const pg = require("../util/DB");
var bcrypt = require("bcryptjs");
const User = require("../model/users.model");

//? User Signup
exports.userSignup = async (req, res) => {
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
      roleid,
      deptid,
    } = req.body;

    const users = await User.findOne({ where: { email: email } });
    if (users) {
      res
        .status(200)
        .json(success("User Already exits", users, res.statusCode));
    } else {
      User.create({
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
        roleid: roleid,
        deptid: deptid,
      })
        .then((result) => {
          res
            .status(200)
            .json(success("Users Added successfully", result, res.statusCode));
        })
        .catch((error) => {
          throw error;
        });
    }
  } catch (error) {
    return error;
  }
};

//? userLogin

exports.userLogin = async (req, res) => {
  const users = await pg.query("select * from users where email=$1", [
    req.body.email,
  ]);

  if (users.rows.length <= 0) {
    res
      .status(404)
      .json(error(req.body.email + "does not exists", res.statusCode));
  } else {
    if (await bcrypt.compare(req.body.password, users.rows[0].password)) {
      return res
        .status(200)
        .json(
          success(
            users.rows[0].fullname + " Login Successfully",
            users.rows,
            res.statusCode
          )
        );
    } else {
      return res.status(201).json(error("Wrong credentials", res.statusCode));
    }
  }
};

//? List Users
exports.userList = async (req, res) => {
  try {
    User.findAll()
      .then((users) => {
        res.status(200).json(success("List of Users", users, res.statusCode));
      })
      .catch((error) => {
        res.status(400).json(error("no users found", res.statusCode));
      });
  } catch (error) {
    throw error;
  }
};

//? Get User by id
exports.GetUserById = async (req, res) => {
  try {
    const userid = parseInt(req.params.userid);
    User.findOne({ where: { userid: userid } })
      .then((user) => {
        if (!user) {
          res.status(404).json(error("no user found", res.statusCode));
        } else {
          res.status(200).json(success("User by ID", user, res.statusCode));
        }
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    return error;
  }
};

//? User Update
exports.updateUser = async (req, res) => {
  try {
    const {
      userid,
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
      roleid,
      deptid,
    } = req.body;
    await User.update(
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
        roleid: roleid,
        deptid: deptid,
      },
      { where: { userid: userid } }
    ).then((user) => {
      User.findOne({ where: { userid: userid } }).then((updateUser) => {
        if (updateUser) {
          res
            .status(200)
            .json(success("Updated user data", updateUser, res.statusCode));
        } else {
          res.status(400).json(error("user not updated", res.statusCode));
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async(req,res)=>{
    try {
      await  User.update({
            isdeleted:1
        },{where:{userid:req.body.userid}}).then(user=>{
                User.findOne({where:{userid:req.body.userid,isdeleted:1}}).then(deletedUser=>{
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
