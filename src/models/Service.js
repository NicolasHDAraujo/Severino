import Sequelize, { Model } from 'sequelize';

export default class Service extends Model {
  static init(sequelize) {
    super.init({
      categoria: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Categoria não pode ser vazio',
          },
        },
      },
      tipo: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Tipo não pode ser vazio',
          },
        },
      },
      descricao: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Descrição não pode ser vazio',
          },
        },
      },
      titulo: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Titulo não pode ser vazio',
          },
        },
      },
      tag: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 500],
            msg: 'Limite minimo de 2 e maximo de 500 caracteres',
          },
        },
      },

    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) { // associando chave estrangeira dos Models
    this.belongsTo(models.User, { foreignKey: 'user_id' });// este model pertence ao user
    this.hasMany(models.Schedule, { foreignKey: 'service_id' });
    this.hasMany(models.Assessment, { foreignKey: 'service_id' });
    this.hasMany(models.Image, { foreignKey: 'service_id' });
    this.hasOne(models.Address, { foreignKey: 'service_id' });
  }
}
