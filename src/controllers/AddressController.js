import Address from '../models/Address';

const { consultarCep } = require('correios-brasil');

class AddressController {
  async create(req, res) { // criar novo
    try {
      const user_id = req.userId;
      const dados = req.body;
      const created = await Address.create({ ...dados, user_id });
      console.log(created);
      return res.json(created);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    // retornar um endereco consultando pela api para o frontend mapear e preencher os campos
    try {
      const { cep } = req.body;
      if (!cep) {
        return res.status(400).json({
          errors: ['Cep não enviado'],
        });
      }

      const retorno = await consultarCep(cep).then((resposta) => res.json(resposta));

      return res.json(retorno);
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
