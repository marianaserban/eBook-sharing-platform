module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('Uploads',{
       uploadDate: DataTypes.STRING,
     
    },{
        underscored:true
    })
}