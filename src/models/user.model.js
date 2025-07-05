require("dotenv").config();
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../configs/db.sequelize.config");
const bcrypt = require("bcrypt");
const salts = parseInt(process.env.SALTS);
const Genders = require("./user.genders.model")
//const Icons = require("./user.icons.model")
const UserStats = require("./user.stats.model")
const Roles = require("./user.roles.model")

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    genderId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model:"genders",
            key:"id"
        }
    },
    // iconId: {
    // type: DataTypes.INTEGER.UNSIGNED,
    //     allowNull: false,
    //     references: {
    //         model:"Icons",
    //         key:"id"
    //     }
    // },
    rolesId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

User.beforeCreate((user) => {
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, salts);
  }
});

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// User.belongsTo(Genders,{
//     foreignKey: "genderId",
//     as:"gender"
// })
// User.belongsTo(Icons,{
//     foreignKey: "iconId",
//     as:"icon"
// })
// User.hasOne(UserStats,{ foreignKey: "user_id", as:"stats" });

// User.belongsTo(Roles,{
//     foreignKey: "rolesId",
//     as: "role"
// })


module.exports = User;
