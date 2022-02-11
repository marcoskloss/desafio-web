import { prisma } from '@src/database';
import { UserService } from '../services/user-service';

describe('user-service tests', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({}); // clear user table
  });
  afterAll(async () => {
    await prisma.user.deleteMany({});
  });

  const userData = {
    name: 'username',
    code: 123,
    image_url: 'http:url.com.br',
    birth_date: new Date(),
  };
  const userService = new UserService();

  describe('insert', () => {
    it('should insert a new user', async () => {
      const { id } = await userService.insert(userData);
      const user = await prisma.user.findFirst({ where: { id } });
      expect(user).toMatchObject({ ...userData });
    });
  });

  describe('update', () => {
    it('should update a existing user', async () => {
      const { id } = await userService.insert(userData);

      await userService.update(id, { name: 'new name' });

      await expect(
        prisma.user.findFirst({ where: { id } })
      ).resolves.toMatchObject({
        ...userData,
        name: 'new name',
      });
    });

    it('should return null when user to be updated is not found', async () => {
      const user = await userService.update(99, { name: 'new name' });
      expect(user).toBeNull();
    });
  });

  describe('isUniqueCode', () => {
    it('should return true if the given code is unique', async () => {
      await userService.insert(userData);
      await expect(userService.isUniqueCode(40028922)).resolves.toBeTruthy();
    });

    it('should return false if the given code is not unique', async () => {
      await userService.insert(userData);

      await expect(
        userService.isUniqueCode(userData.code)
      ).resolves.toBeFalsy();
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const { id } = await userService.insert(userData);
      await userService.delete(id);

      await expect(
        prisma.user.findFirst({ where: { id } })
      ).resolves.toBeNull();
    });
  });
});
