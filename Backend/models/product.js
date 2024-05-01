const Sequelize = require("sequelize");

class Product extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: DataTypes.STRING,
                description: DataTypes.TEXT,
                price: DataTypes.FLOAT,
                image: DataTypes.BLOB,
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'products',
                sequelize,
            }
        );
    }

}

module.exports = Product;