import multer from 'multer';
import multerConfig from '../config/multer';
import Image from '../models/Image';

const upload = multer(multerConfig).single('image');// pegando o nome do arquivo

class ImageController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) { // tratando o erro
        console.log(error);
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const user_id = req.userId;
        const image = await Image.create({ originalname, filename, user_id });

        return res.json(image);
      } catch (e) {
        return res.status(400).json({
          errors: ['Usuário não cadastrado'],
        });
      }
    });
  }
}
export default new ImageController();
