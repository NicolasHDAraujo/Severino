import Schedule from '../models/Schedule';

class ScheduleController {
  async create(req, res) { // criar novo
    try {
      const novoDado = await Schedule.create(req.body);
      console.log(novoDado);
      const {
        dia, de, ate, service_id,
      } = novoDado;
      return res.json({
        dia, de, ate, service_id,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) { // atualizar
    try {
      const schedule = await Schedule.findByPk(req.params.id);

      if (!schedule) {
        return res.status(400).json({
          errors: ['Serviço não existe!'],
        });
      }

      const novoDado = await schedule.update(req.body);

      return res.json(novoDado);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const schedule = await Schedule.findByPk(req.params.id);

      if (!schedule) {
        return res.status(400).json({
          errors: ['Avaliação não existe!'],
        });
      }

      await schedule.destroy();

      return res.send(res.status(200).json(
        'Deletado com sucesso!',
      ));
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
export default new ScheduleController();
