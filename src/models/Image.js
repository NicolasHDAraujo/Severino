import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

const { url } = appConfig;

export default class Image extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Nome original não pode ser vazio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Imagem não pode ser vazio',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) { // associando foto ao usuario
    this.belongsTo(models.User, { foreignKey: 'user_id' });// este model pertence ao user
    this.belongsTo(models.User, { foreignKey: 'service_id' });// este model pertence ao user
  }
}
