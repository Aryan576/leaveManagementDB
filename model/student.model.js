const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../util/DB');
const Role=require('../model/role.model')
const Department=require('../model/department.model')
const Student= sequelize.define('student',{
    studid:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true   
        
    },fullname:{
        type:Sequelize.STRING,
        allowNull: false,
        require:true
    },number:{
        type:Sequelize.BIGINT,
        allowNull: false,
        require:true
    },dob:{
            type:Sequelize.DATEONLY,
            allowNull: false,
            require:true
    },gender:{
        type:Sequelize.STRING,
        allowNull: false,
            require:true
    },email:{
        type:Sequelize.STRING,
        allowNull: false,
            require:true
    },password:{
        type:Sequelize.STRING,
        allowNull: false,
        require:true
    },address:{
        type:Sequelize.TEXT,
        allowNull: false,
        require:true
    },city:{
        type:Sequelize.STRING,
        allowNull: false,
        require:true
    },state:{
        type:Sequelize.STRING,
        allowNull: false,
        require:true
    },pincode:{
        type:Sequelize.INTEGER,
        allowNull:false,
        require:true,
    },
    semester:{
        type:Sequelize.STRING,
        allowNull: false,
        require:true
    },enrollmentno:{
        type:Sequelize.STRING,
        allowNull: false,
        require:true
    },
    isdeleted:{
        type:Sequelize.INTEGER,
        allowNull:false,
        require:true,
        defaultValue:0
    }

})

Student.belongsTo(Role,{
    foreignKey: 'roleid'
  })
  Student.belongsTo(Department,{
    foreignKey: 'deptid'
  })

  module.exports = Student