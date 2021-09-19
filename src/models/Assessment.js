import Sequelize, { Model } from 'sequelize';

export default class Assessment extends Model {
  static init(sequelize) {
    super.init({
      nota: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
      conteudo: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Service, { foreignKey: 'service_id' });
    this.hasOne(models.Assessment, { foreignKey: 'user_id' });
  }
}
