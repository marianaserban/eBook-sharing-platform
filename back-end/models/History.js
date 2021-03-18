module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('History',{
       openDate: DataTypes.DATE,
     
    },{
        underscored:true
    })
}