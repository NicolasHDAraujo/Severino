import User from '../models/User';
import Image from '../models/Image';
import Service from '../models/Service';
import Address from '../models/Address';

class UserController {
  async create(req, res) { // criar novo
    try {
      const novoUser = await User.create(req.body);
      return res.json({ novoUser });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) { // retornar um
    try {
      const id = req.userId;

      if (!id) {
        console.log(id);
        return res.status(400).json({
          errors: ['Id não enviado'],
        });
      }

      const user = await User.findByPk(id, {
        order: [
          ['id', 'DESC'],
          [Image, 'id', 'DESC'],
          [Service, 'id', 'DESC'],
          [Address, 'id', 'DESC'],
        ],
        include: [
          { model: Image },
          { model: Service },
          { model: Address },
        ],
      });

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não encontrado'],
        });
      }

      return res.json(user);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) { // atualizar
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Não encontrado o usuário!'],
        });
      }

      const novosDados = await user.update(req.body);
      return res.json(novosDados);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) { // deletar
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Não encontrado o usuário!'],
        });
      }

      await user.destroy();
      return res.send(res.status(200).json(
        'Deletado com sucesso!',
      ));
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
export default new UserController();
