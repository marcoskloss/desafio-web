import { ControllerHandler } from '@src/types/controller';
import { UserModel } from '@src/modules/user/model/user-model';
import { prisma } from '@src/database';

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
    };

    const userModel = new UserModel();
    const user = await userModel.create(userData);

    return res.status(201).json(user);
  };

  public delete: ControllerHandler = async (req, res) => {
    const userModel = new UserModel();
    await userModel.delete(Number(req.params.userId));
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
}
