module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('Uploads',{
       uploadDaye: DataTypes.DATE,
     
    },{
        underscored:true
    })
}