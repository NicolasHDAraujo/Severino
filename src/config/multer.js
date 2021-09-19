import multer from 'multer';
import { extname, resolve } from 'path';
// gerar um valor para evitar ter duas imagens salvas com o mesmo nome
const valorRandom = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => { // verificando a extensão da imagem submetida
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser PNG OU JPG.'));
    }

    return cb(null, true);// retornando erro null e passando pro proximo passo
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => { // dar o diretorio onde irá ser salvo a imagem
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => { // dar um novo nome a imagem upada
      cb(null, `${Date.now()}_${valorRandom()}_severino${extname(file.originalname)}`);
    },
  }),
};
