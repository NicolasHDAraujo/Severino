import Assessment from '../models/Assessment';

class AssessmentController {
  async create(req, res) { // criar novo
    try {
      const novaAvaliacao = await Assessment.create(req.body);
      const {
        nota, conteudo, service_id,
      } = novaAvaliacao;
      return res.json({
        nota, conteudo, service_id,
      });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) { // atualizar
    try {
      const assessment = await Assessment.findByPk(req.params.id);

      if (!assessment) {
        return res.status(400).json({
          errors: ['Serviço não existe!'],
        });
      }

      const novoDado = await assessment.update(req.body);

      return res.json(novoDado);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const assessment = await Assessment.findByPk(req.params.id);

      if (!assessment) {
        return res.status(400).json({
          errors: ['Avaliação não existe!'],
        });
      }

      await assessment.destroy();

      return res.send(res.status(200).json(
        'Deletado com sucesso!',
      ));
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
export default new AssessmentController();
