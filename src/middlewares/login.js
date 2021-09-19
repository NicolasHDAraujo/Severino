import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Não autorizado, necessário estar logado!'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);// dados recebidos da jwt do token
    const { id, email } = dados;
    // verificando se o email e o usuário batem com o banco
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Não autorizado, usuário inválido!'],
      });
    }

    // dados acessiveis após o login do usuário através do token
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Não autorizado, token inválido!'],
    });
  }
};
