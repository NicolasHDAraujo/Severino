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
          errors: ['CEP não enviado'],
        });
      }

      try {
        const retorno = await consultarCep(cep).then((resposta) => res.json(resposta));
        return res.json(retorno);
      } catch (e) {
        return res.status(400).json({ errors: ['CEP inválido'] });
      }
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) { // atualizar endereco
    try {
      const address = await Address.findByPk(req.params.id);
      const user_id = req.userId;

      if (!address) {
        return res.status(400).json({
          errors: ['Endereço não existe!'],
        });
      }

      if (user_id !== address.user_id) {
        return res.status(400).json({
          errors: ['Endereço não pertence ao usuário!'],
        });
      }

      const dados = req.body;

      const novoDado = await address.update({ ...dados, user_id });

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

      const { user_id } = address;
      const id_user = req.userId;

      if (id_user !== user_id) {
        return res.status(400).json({
          errors: ['Endereço não pertence ao usuário!'],
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
