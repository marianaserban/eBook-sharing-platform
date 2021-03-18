module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('Books',{
       title: DataTypes.STRING,
       genre: DataTypes.STRING,
       author: DataTypes.STRING,
       availability: DataTypes.BOOLEAN,
       raiting:DataTypes.FLOAT,
       description: DataTypes.TEXT,
       path:DataTypes.STRING,
       picture:DataTypes.TEXT
    
    },{
        underscored:true
    })
}