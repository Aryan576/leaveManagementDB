const { success, error, validation } = require("../response");
const pg = require("../DB");

//?addDepartments
exports.addDepartment = async (req, res) => {
  try {
    const{departmentname}=req.body;
   
    pg.query('insert into department(departmentname) values($1)',[departmentname],(error,result)=>{
        
      
        if(error)
        {
            throw error;
        }else{
            res.status(200).
            json(success("Department added successfully",{departmentname}, res.statusCode))
        }
    })

  } catch (error) {
    return error
  }
};
//? List of Departments
exports.getDepartment=async(req,res)=>{
    try{
        pg.query('select * from department',(error,result)=>{
           
            if(error){
                throw error;
            }else{
                res.status(200).json(success("List of Departments",result.rows, res.statusCode))
            }
        })
    }catch(error){
        return error;
    }

}

//? getDepartment BYID
exports.getDepartmentById=async(req,res)=>{
    try{
        const departmentid =parseInt(req.params.departmentid);
        console.log(departmentid);
        pg.query('select * from department where departmentid=$1',[departmentid],(error,result)=>{
          
            if(error){
                throw error;
            }else{
                res.status(200).json(success("Department ById",result.rows,res.statusCode))
            }
        })

    }catch(error){
            return error;
    }
}

exports.updateDepartment=async(req,res)=>{
    try{
        const departmentid= parseInt(req.body.departmentid);
        console.log(departmentid);
        const{departmentname}=req.body
        pg.query('update department set departmentname=$1 where departmentid=$2',[departmentname,departmentid],(error,result)=>{
            if(error){
                throw error;
            }else{
                res.status(200).json(success("Department Updated Successfully",{departmentname,departmentid},res.statusCode));
            }
        })
    }catch(error){

        return error;

    }
}

exports.deleteDepartment=async(req,res)=>{
    try{
        const departmentid=req.body.departmentid;
        pg.query('delete from department where departmentid=$1',[departmentid],(error,result)=>{
            console.log(result.rows);
            if(error){
                    throw error;
            }else{
                res.status(200).json(success("Deleted Department",result.rows, res.statusCode))
            }
        })
    }catch(error){

        return error;

    }
}


