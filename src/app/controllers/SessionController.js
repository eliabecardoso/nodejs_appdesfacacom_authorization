const { User } = require("../models");

class SessionController {
  async authenticate(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(401).json({ message: "Informe o usuário e senha" });

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(401).json({ message: "Usuário não encontrado" });

    if (!(await user.checkPassword(password)))
      return res.status(401).json({ message: "Senha inválida" });

    return res.status(200).json({
      user,
      token: await user.generateToken()
    });
  }
}

module.exports = new SessionController();
