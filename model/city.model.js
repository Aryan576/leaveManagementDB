const Sequelize = require('sequelize');
const sequelize = require('../util/DB');

 const States = require('../model/states.model'); 
const City=sequelize.define('city',{
    cityid:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },cityname:{
        type:Sequelize.STRING,
        allowNull:false,
        require:true
    },isdeleted:{
        type:Sequelize.INTEGER,
        allowNull:false,
        require:true,
        
    } 

} ,{timestamps: false} )

 City.belongsTo(States, {
    foreignKey: 'stateid',
}) 
module.exports =City;