const Sequelize = require('sequelize');
const sequelize = require('../util/DB');
const Department= sequelize.define('department',{
        deptid:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        deptname:{
            type:Sequelize.STRING,
            allowNull:false,
            require:true
        }
})


module.exports=Department