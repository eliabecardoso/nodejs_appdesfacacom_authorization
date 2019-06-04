const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      password: DataTypes.VIRTUAL
    },
    {
      hooks: {
        afterValidate: (user, options) => {
          return isValid(user).then(err => {
            if (err)
              return Promise.reject(new Error(`campo(s) "${err}" inválido(s)`));
          });
        },
        beforeSave: async user => {
          if (user.password)
            user.password_hash = await bcrypt.hash(
              user.password,
              Number(process.env.HASH_ROUNDS)
            );
        }
      }
    }
  );

  User.prototype.checkPassword = async function(password) {
    return bcrypt.compare(password, this.password_hash);
  };

  User.prototype.generateToken = async function() {
    return jwt.sign(
      { id: this.id, username: this.username },
      process.env.APP_SECRET,
      { expiresIn: "2m", issuer: "http://google.com.br/xesq" }
    );
  };

  return User;
};

const isValid = user => {
  const err = [];

  if (!user.name) err.push("Nome");

  if (!user.username) err.push("UserName");

  if (!user.email) err.push("Email");

  if (!user.password) err.push("Password");

  return Promise.resolve(
    err.length > 0 && err.reduce((prev, curr) => prev + "," + curr)
  );
};
