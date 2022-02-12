import { User } from '@prisma/client';
import { AppError } from '@src/errors/app-error';
import { UserService } from '@src/modules/user/services/user-service';

export class UserModel {
  constructor(private userService = new UserService()) {}

  public async create(data: User): Promise<User> {
    const isUniqueCode = await this.userService.isUniqueCode(data.code);

    if (!isUniqueCode) {
      throw new AppError(
        'O código informado já foi utilizado em outro usuário!'
      );
    }

    return this.userService.insert(data);
  }

  public async update(id: number, data: Partial<User>): Promise<User | null> {
    return this.userService.update(id, data);
  }

  public async delete(id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
