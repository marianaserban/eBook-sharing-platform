const sequelize = require('../config/db.js')
const Users = sequelize.import("./Users");
const Books = sequelize.import('./Books.js')
const History = sequelize.import('./History.js')
const Reviews = sequelize.import('./Reviews.js')
const Uploads = sequelize.import('./Uploads.js')
const UsersBooks = sequelize.import('./UsersBooks.js')

Users.hasMany(UsersBooks, {
    onDelete: "Cascade",
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
})
UsersBooks.belongsTo(Users, {
    foreignKey: {
        name: 'userId'
        , allowNull: false
    }
})

Books.hasMany(UsersBooks, {
    onDelete: "Cascade",
    foreignKey: {
        name: 'bookId',
        allowNull: false
    }
})
UsersBooks.belongsTo(Books, {
    foreignKey: {
        name: 'bookId'
        , allowNull: false
    }
})

Books.hasMany(History, {
    onDelete: "Cascade",
    foreignKey: {
        name: 'bookId',
        allowNull: false
    }
})
History.belongsTo(Books, {
    foreignKey: {
        name: 'bookId'
        , allowNull: false
    }
})

Users.hasMany(History, {
    onDelete: "Cascade",
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
})
History.belongsTo(Users, {
    foreignKey: {
        name: 'userId'
        , allowNull: false
    }
})

Users.hasMany(Uploads, {
    onDelete: "Cascade",
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
})
Uploads.belongsTo(Users, {
    foreignKey: {
        name: 'userId'
        , allowNull: false
    }
})

Books.hasOne(Uploads, {
    onDelete: "Cascade",
    foreignKey: {
        name: 'bookId',
        allowNull: false
    }
})
Uploads.belongsTo(Books, {
    foreignKey: {
        name: 'bookId'
        , allowNull: false
    }
})

Users.hasMany(Reviews, {
    onDelete: "Cascade",
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
})
Reviews.belongsTo(Users, {
    foreignKey: {
        name: 'userId'
        , allowNull: false
    }
})

Books.hasMany(Reviews, {
    onDelete: "Cascade",
    foreignKey: {
        name: 'bookId',
        allowNull: false
    }
})
Reviews.belongsTo(Books, {
    foreignKey: {
        name: 'bookId'
        , allowNull: false
    }
})

module.exports = {
    Users,
    Books,
    History,
    Reviews,
    Uploads,
    UsersBooks,
    connection: sequelize
};
