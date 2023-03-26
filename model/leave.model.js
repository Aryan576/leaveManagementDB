const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../util/DB');
const User=require('../model/users.model')
const Department=require('../model/department.model')
const Student=require('../model/student.model')
const Status=require('../model/status.model')

const Leave= sequelize.define('Leave',{
    leaveid:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },leavetype:{
        type:Sequelize.STRING,
        allowNull: false,
        require:true
    },leavefrom:{
        type:Sequelize.DATEONLY,
            allowNull: false,
            require:true
    },leaveto:{
        type:Sequelize.DATEONLY,
        allowNull: false,
        require:true
    },noofdays:{
        type:Sequelize.INTEGER,
        allowNull: true,
        require:true
    },leavereason:{
        type:Sequelize.STRING,
        allowNull: false,
        require:true
    }
})

Leave.belongsTo(Department,{
    foreignKey: 'deptid'
})
Leave.belongsTo(Student,{
    foreignKey: 'studid'
})
Leave.belongsTo(User,{
    foreignKey: 'userid'
})
Leave.belongsTo(Status,{
    foreignKey: 'statusid'
})



module.exports = Leave