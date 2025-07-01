const {DataTypes, Model} = require("sequelize")
const sequelize = require("../configs/db.sequelize.config")

class ExperienceLevels extends Model {}

ExperienceLevels.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
},{
    sequelize,
    modelName:"ExperienceLevels",
    tableName:"experience_levels",
})

module.exports = ExperienceLevels;