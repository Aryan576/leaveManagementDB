const { success, error, validation } = require("../response");
const pg= require('../DB')

//! addroles
exports.addRole=async(req,res)=>{
    try {
        const {rolename}=req.body
        pg.query('insert into role(rolename) values($1)',[rolename],(error,result)=>{
                if(error)
                {
                   throw error
                }else{
                    res
                    .status(200)
                    .json(success("OK", { data: rolename }, res.statusCode));
                }
        });
        
    } catch (error) {
        return error;
    }
}


//? getrols
exports.getRoles=async(req,res)=>{

    try {
       
        pg.query('select * from role',(error,result)=>{
                if(error){
                    throw error
                }else{
                    res.status(200).json(success("List of Roles", { data: result.rows }, res.status))
                }
        })
    }catch(error){
            return error;
        }
    }

    //?geroles byID
    exports.getRolesByID=async(req,res)=>{
        try {
            const roleid = parseInt(req.params.roleid);
            console.log(roleid);
            pg.query('select * from role where roleid=$1',[roleid],(error,result)=>{
                if(error)
                {
                    throw error
                }else{
                    res.status(200).json(success(" Role By iD", { data: result.rows }, res.status))
                }
            }
        )}catch(error){

               return error
        }
    }


  //?update role
    exports.updateRole=async(req,res)=>{
        try {
            const roleid = parseInt(req.body.roleid);
            const {rolename}=req.body
          
            pg.query('update role set rolename=$1 where roleid=$2',[rolename,roleid],(error,results)=>{
                    console.log(results.affectedRows);
                    if(error)
                    {
                        throw error
                    }else{
                       
                        res.status(200).json(success("role updated", { rolename,roleid }, res.statusCode));
                    }
            });  
          
        }catch  (error ){

            return error;

        }
    };

    //?delete role
    exports.deleteRole=async(req,res)=>{
        try {
            const roleid = parseInt(req.body.roleid);
            pg.query('delete from role where roleid=$1',[roleid],(error,result)=>{
                if(error)
                {
                    throw error
                }else{
                    res.status(200).json(success("role deleted", { roleid }, res.statusCode));
                }
            });
    }catch(error){

    }
}

