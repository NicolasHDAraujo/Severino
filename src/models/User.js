import Sequelize, { Model } from 'sequelize';

import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      whatsapp: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [11],
            msg: 'Campo whatsapp somente 12 numeros',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 10],
            msg: 'Senha precisa ter entre 5 e 10 caracteres',
          },
        },
      },
      is_proff: {
        type: Sequelize.BOOLEAN,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Necessário informar se é profissional',
          },
        },
      },
    }, {
      sequelize,
    });
    // gerar hash da senha
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  // verificando se a senha é valida
  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasOne(models.Image, { foreignKey: 'user_id' });
    this.hasMany(models.Service, { foreignKey: 'user_id' });
    this.hasMany(models.Address, { foreignKey: 'user_id' });
  }
}
