const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                createdAt: DataTypes.DATE
            },
            {
                tableName: 'users',
                sequelize,
                timestamps: false
            }
        );
    }

}

module.exports = User;