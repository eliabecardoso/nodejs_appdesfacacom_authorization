const { User } = require("../models");

class RegisterController {
  async store(req, res) {
    const { username, email, ...rest } = req.body && req.body.user || null; 

    if (!username || !email)
      return res
        .status(400)
        .json({ message: "Error: campo Email ou Username inválido" });

    const userFinded = await User.findOne({ where: { username, email } });

    if (userFinded)
      return res
        .status(401)
        .json({ message: "Já existe usuário cadastrado com esses dados" });

    let errorOnCreate;
    const user = await User.create({ username, email, ...rest })
      .then(user => user)
      .catch(err => (errorOnCreate = err && err.toString()));

    if (typeof errorOnCreate === "string")
      return res.status(400).json({ message: user });

    return res.status(200).json();
  }
}

module.exports = new RegisterController();
