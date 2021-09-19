import Sequelize, { Model } from 'sequelize';

export default class Schedule extends Model {
  static init(sequelize) {
    super.init({
      dia: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ser vazio',
          },
        },
      },
      de: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ser vazio',
          },
        },
      },
      ate: {
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

  static associate(models) {
    this.belongsTo(models.Service, { foreignKey: 'service_id' });
  }
}
