module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('UsersBooks',{     
    },{
        underscored:true
    })
}