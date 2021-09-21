import multer from 'multer';
import multerConfig from '../config/multer';
import Image from '../models/Image';

const upload = multer(multerConfig).single('image');// pegando o nome do arquivo

class ImageController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) { // tratando o erro
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const user_id = req.userId;
        const image = await Image.create({
          originalname, filename, user_id,
        });

        return res.json(image);
      } catch (e) {
        return res.status(400).json({
          errors: ['Usuário não cadastrado'],
        });
      }
    });
  }

  createImgService(req, res) {
    return upload(req, res, async (error) => {
      if (error) { // tratando o erro
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const service_id = req.params.id;
        console.log(`ID DE SERVIÇO ${service_id}`);
        const user_id = req.userId;
        const image = await Image.create({
          originalname, filename, user_id, service_id,
        });

        return res.json(image);
      } catch (e) {
        return res.status(400).json({
          errors: ['Serviço não cadastrado'],
        });
      }
    });
  }
}
export default new ImageController();
