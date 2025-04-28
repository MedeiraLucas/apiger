const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
  static async createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // força 10
      const user = await User.create({ name, email, password: hashedPassword });

      // Não retornar senha no JSON de resposta
      const { password: _, ...userWithoutPassword } = user.toJSON();

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  }

  static async listUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] } // não mostra senha
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários', details: error.message });
    }
  }

  static async deleteUser(req, res) {
    const id = parseInt(req.params.id);

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await user.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
    }
  }
}

module.exports = UserController;
