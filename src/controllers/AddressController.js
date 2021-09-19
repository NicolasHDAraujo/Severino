import Address from '../models/Address';

class AddressController {
  async create(req, res) { // criar novo
    try {
      const created = await Address.create(req.body);

      return res.json(created);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) { // atualizar endereco
    try {
      const address = await Address.findByPk(req.params.id);

      if (!address) {
        return res.status(400).json({
          errors: ['Endereço não existe!'],
        });
      }

      const novoDado = await address.update(req.body);

      return res.json(novoDado);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const address = await Address.findByPk(req.params.id);

      if (!address) {
        return res.status(400).json({
          errors: ['Endereço não existe!'],
        });
      }

      await address.destroy();

      return res.send(res.status(200).json(
        'Deletado com sucesso!',
      ));
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new AddressController();
