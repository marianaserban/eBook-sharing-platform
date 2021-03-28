module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('Reviews',{
       content: DataTypes.TEXT,
       raiting:DataTypes.FLOAT
     
    },{
        underscored:true
    })
}