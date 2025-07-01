const {DataTypes, Model} = require("sequelize")

const sequelize = require("../configs/db.sequelize.config")

class Icons extends Model {}

Icons.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    sequelize,
    modelName:"Icons"
})

module.exports = Icons;