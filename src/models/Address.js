import Sequelize, { Model } from 'sequelize';

export default class Address extends Model {
  static init(sequelize) {
    super.init({
      logradouro: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Rua não pode ser vazio',
          },
        },
      },
      numero: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Numero não pode ser vazio',
          },
        },
      },
      bairro: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Bairro não pode ser vazio',
          },
        },
      },
      localidade: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Localidade não pode ser vazio',
          },
        },
      },
      uf: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2],
            msg: 'Apenas a sigla do estado',
          },
        },
      },
      cep: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'CEP não pode ser vazio',
          },
        },
      },
      complemento: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      is_proff: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Service, { foreignKey: 'service_id' });
  }
}
