const Sequelize = require('sequelize');
const sequelize = require('../util/DB');
const States= sequelize.define('state',{
        stateid:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },statename:{
            type:Sequelize.STRING,
            allowNull:false,
            require:true
        },isdeleted:{
            type:Sequelize.INTEGER,
            allowNull:false,
            require:true,
            
        } 

} ,{timestamps: false} )


module.exports = States;