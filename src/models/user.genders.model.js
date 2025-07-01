const {DataTypes, Model} = require("sequelize")
const sequelize = require("../configs/db.sequelize.config")

class Genders extends Model {}

Genders.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    sequelize,
    modelName:"Genders",
    tableName:"genders"
}
)

module.exports = Genders