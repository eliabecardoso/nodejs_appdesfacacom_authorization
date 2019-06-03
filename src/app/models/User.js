const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      password: DataTypes.VIRTUAL
    },
    {
      hooks: {}
    }
  );
};
