const {DataTypes, Model} = require("sequelize")

const sequelize = require("../configs/db.sequelize.config")

class Events extends Model {}

Events.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Events",
    tableName: "events",
    timestamps: true
})

module.exports = Events