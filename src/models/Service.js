import Sequelize, { Model } from 'sequelize';

export default class Service extends Model {
  static init(sequelize) {
    super.init({
      categoria: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ser vazio',
          },
        },
      },
      tipo: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ser vazio',
          },
        },
      },
      descricao: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ser vazio',
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
  }
}
