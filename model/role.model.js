const Sequelize = require('sequelize');
const sequelize = require('../util/DB');
const Role=sequelize.define('role',{
    roleid:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    rolename:{
        type:Sequelize.STRING,
        allowNull:false,
        require:true
    }

})

module.exports=Role