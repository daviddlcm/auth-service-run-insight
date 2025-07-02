const {DataTypes, Model} = require("sequelize")
const sequelize = require("../configs/db.sequelize.config")

class Follows extends Model {}


Follows.init({
    following_user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
        model: 'users',
        key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    followed_user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
        model: 'users',
        key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    }, {
    sequelize,
    modelName: "follows",
    tableName: "follows",
    timestamps: true
})

module.exports = Follows