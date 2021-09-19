import Service from '../models/Service';
import User from '../models/User';
import Assessment from '../models/Assessment';
import Schedule from '../models/Schedule';

class ServiceController {
  async create(req, res) { // criar novo
    try {
      const novoServico = req.body;
      const user_id = req.userId;
      const servicoCriado = await Service.create({ ...novoServico, user_id });
      return res.json(servicoCriado);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    const services = await Service.findAll({
      order: [
        ['id', 'DESC'],
        [User, 'id', 'DESC'],
        [Schedule, 'id', 'DESC'],
      ],
      include: [
        { model: User },
        { model: Schedule },
      ],
    });

    res.json(services);
  }

  async show(req, res) { // retornar um
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Id não enviado'],
        });
      }

      const service = await Service.findByPk(id, {
        order: [
          ['id', 'DESC'],
          [User, 'id', 'DESC'],
          [Schedule, 'id', 'DESC'],
          [Assessment, 'id', 'DESC'],
        ],
        include: [
          { model: User },
          { model: Schedule },
          { model: Assessment },
        ],
      });

      if (!service) {
        return res.status(400).json({
          errors: ['Serviço não encontrado'],
        });
      }

      return res.json(service);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async search(req, res) { // buscar por atributos
    try {
      const { categoria, tipo } = req.body;

      const buscaServico = await Service.findAll({
        where: { categoria, tipo },
        order: [
          ['id', 'DESC'],
          [User, 'id', 'DESC'],
          [Schedule, 'id', 'DESC'],
        ],
        include: [
          { model: User },
          { model: Schedule },
        ],
      });

      return res.json(buscaServico);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) { // atualizar
    try {
      const service = await Service.findByPk(req.params.id);

      if (!service) {
        return res.status(400).json({
          errors: ['Serviço não existe!'],
        });
      }

      const novoDado = await service.update(req.body);

      return res.json(novoDado);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const service = await Service.findByPk(req.params.id);

      if (!service) {
        return res.status(400).json({
          errors: ['Serviço não existe!'],
        });
      }

      await service.destroy();

      return res.send(res.status(200).json(
        'Deletado com sucesso!',
      ));
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
export default new ServiceController();
