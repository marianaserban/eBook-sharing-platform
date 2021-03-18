module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('Reviews',{
       content: DataTypes.TEXT,
     
    },{
        underscored:true
    })
}