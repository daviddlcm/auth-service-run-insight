const {DataTypes, Model} = require("sequelize")

const sequelize = require("../configs/db.sequelize.config")

class Roles extends Model {}

Roles.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: "Roles",
    tableName: "roles"
})

module.exports = Roles;