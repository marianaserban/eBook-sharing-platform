module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('Reviews',{
       content: DataTypes.TEXT,
       title:DataTypes.STRING,
       raiting:DataTypes.STRING,
       addDate:DataTypes.STRING
    },{
        underscored:true
    })
}