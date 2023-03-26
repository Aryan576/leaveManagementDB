const Sequelize = require('sequelize');
const sequelize = require('../util/DB');
const Status= sequelize.define('status',{
        statusid:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        statusname:{
            type:Sequelize.STRING,
            allowNull:false,
            require:true
        }
})


module.exports=Status