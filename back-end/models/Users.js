module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('Users',{
        userName: DataTypes.STRING,
        email:DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        role:{ type: DataTypes.STRING,
                default: 'user'
         },
         thumbnail :DataTypes.TEXT
    },{
        underscored:true
    })
}