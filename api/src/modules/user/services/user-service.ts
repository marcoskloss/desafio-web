import { User } from '@prisma/client';
import { prisma } from '@src/database';

export class UserService {
  public async insert(data: Omit<User, 'id'>): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }

  public async update(id: number, data: Partial<User>): Promise<User | null> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data,
      });

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  public async isUniqueCode(code: number): Promise<boolean> {
    const user = await prisma.user.findFirst({ where: { code } });
    return !user;
  }
}
