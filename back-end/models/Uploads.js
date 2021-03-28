module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('Uploads',{
       uploadDate: DataTypes.DATE,
     
    },{
        underscored:true
    })
}