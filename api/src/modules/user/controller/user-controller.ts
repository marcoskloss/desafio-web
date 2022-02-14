import fs from 'fs';
import path from 'path';
import { ControllerHandler } from '@src/types/controller';
import { UserModel } from '@src/modules/user/model/user-model';
import { prisma } from '@src/database';

const DEFAULT_IMAGE_PATH = 'default-image.jpg';

function getImagePath(url: string): string {
  return path.resolve(__dirname, '..', '..', '..', 'images', url);
}

export class UserController {
  public show: ControllerHandler = async (req, res) => {
    const userId = Number(req.params.userId);

    const user = await prisma.user.findFirst({ where: { id: userId } });

    return res.json(user);
  };

  public list: ControllerHandler = async (req, res) => {
    const users = await prisma.user.findMany();
    return res.json(users);
  };

  public store: ControllerHandler = async (req, res) => {
    const { body } = req;

    const userData = {
      ...body,
      birth_date: new Date(body.birth_date),
      image_url: DEFAULT_IMAGE_PATH,
    };

    const userModel = new UserModel();
    const user = await userModel.create(userData);

    return res.status(201).json(user);
  };

  public delete: ControllerHandler = async (req, res) => {
    const userModel = new UserModel();
    const user = await prisma.user.findFirst({
      where: { id: Number(req.params.userId) },
    });

    if (!user) return res.json({ error: 'Usuário não encontrado!' });

    if (user.image_url !== DEFAULT_IMAGE_PATH) {
      const imagePath = getImagePath(user.image_url);
      fs.unlinkSync(imagePath);
    }

    await userModel.delete(user.id);
    return res.status(204).end();
  };

  public update: ControllerHandler = async (req, res) => {
    const userModel = new UserModel();
    const updatedUser = await userModel.update(
      Number(req.params.userId),
      req.body
    );

    return res.json(updatedUser);
  };

  public uploadImage: ControllerHandler = async (req, res) => {
    const userModel = new UserModel();
    const userId = Number(req.params.userId);

    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) return res.json({ error: 'Usuário não encontrado!' });

    if (user?.image_url !== DEFAULT_IMAGE_PATH) {
      const oldfilePath = getImagePath(user?.image_url);
      fs.unlinkSync(oldfilePath);
    }

    const updatedUser = await userModel.update(userId, {
      image_url: req.file?.filename,
    });

    return res.json(updatedUser);
  };

  public deleteImage: ControllerHandler = async (req, res) => {
    const userId = Number(req.params.userId);

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) return res.json({ error: 'Usuário não encontrado!' });

    const imagePath = getImagePath(user.image_url);

    if (user.image_url !== DEFAULT_IMAGE_PATH) {
      fs.unlinkSync(imagePath);
    }

    const userModel = new UserModel();
    await userModel.update(userId, { image_url: DEFAULT_IMAGE_PATH });

    return res.json(null);
  };
}
