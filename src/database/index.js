// todos os models criados no sistema precisam estar nesse arquivo
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Service from '../models/Service';
import Image from '../models/Image';
import Schedule from '../models/Schedule';
import Assessment from '../models/Assessment';
import Address from '../models/Address';
// incluir todos os models aqui
const models = [User, Service, Image, Schedule, Assessment, Address];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));// percorrer o array
// verificando se tem associassões e executando
models.forEach((model) => model.associate && model.associate(connection.models));
