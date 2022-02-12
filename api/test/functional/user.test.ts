import { prisma } from '@src/database';
import { doRequest, Methods } from '../doRequest';

describe('[POST] /users', () => {
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  test('should create a new user', async () => {
    const options = {
      method: Methods.post,
    };

    const body = {
      name: 'username',
      birth_date: new Date(),
      code: 123,
      image_url: 'img-url',
    };

    const response = await doRequest('/users', body, options);

    const user = await prisma.user.findUnique({ where: { code: body.code } });

    expect(response.status).toBe(201);
    expect(response.data).toEqual(
      expect.objectContaining({
        ...user,
        birth_date: user?.birth_date.toISOString(),
      })
    );
  });

  test('should return 400 if the user data provided is invalid', async () => {
    const options = {
      method: Methods.post,
    };

    const body = {
      name: 'username',
      birth_date: new Date(),
      code: 123,
    };

    const response = await doRequest('/users', body, options);

    const user = await prisma.user.findUnique({ where: { code: body.code } });

    expect(user).toBeNull();
    expect(response.status).toBe(400);
  });
});

describe('[GET] /users:userId', () => {
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  it('should return the user of the corresponding id', async () => {
    const userData = {
      code: 123,
      name: 'username',
      birth_date: new Date(),
      image_url: 'url',
    };

    const options = {
      method: Methods.get,
    };

    const user = await prisma.user.create({ data: { ...userData } });

    const { status, data } = await doRequest(`/users/${user.id}`, {}, options);

    expect(status).toBe(200);
    expect(data).toEqual({
      ...user,
      birth_date: user.birth_date.toISOString(),
    });
  });
});

describe('[GET] /users', () => {
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  it('should list all users', async () => {
    const userDataList = [
      { code: 1, name: 'user 1', birth_date: new Date(), image_url: 'url' },
      { code: 2, name: 'user 2', birth_date: new Date(), image_url: 'url' },
      { code: 3, name: 'user 3', birth_date: new Date(), image_url: 'url' },
    ];

    await prisma.user.createMany({ data: userDataList });
    const options = { method: Methods.get };

    const { status, data } = await doRequest('/users', {}, options);

    expect(status).toBe(200);
    expect(data).toEqual(
      expect.arrayContaining(
        userDataList.map((user) => ({
          ...user,
          birth_date: user.birth_date.toISOString(),
          id: expect.any(Number),
        }))
      )
    );
  });
});

describe('[DELETE] /users/:userId', () => {
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  it('should delete the user of the corresponding id', async () => {
    const user = await prisma.user.create({
      data: {
        birth_date: new Date(),
        code: 1,
        image_url: 'url',
        name: 'username',
      },
    });

    const options = { method: Methods.delete };

    const { status } = await doRequest(`/users/${user.id}`, {}, options);

    const deletedUser = await prisma.user.findFirst({ where: { id: user.id } });

    expect(deletedUser).toBeNull();
    expect(status).toBe(204);
  });
});

describe('[PUT] /users/:userId', () => {
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  it('should update the user of the corresponding id', async () => {
    const user = await prisma.user.create({
      data: {
        birth_date: new Date(),
        code: 1,
        image_url: 'url',
        name: 'username',
      },
    });

    const userData = {
      name: 'new username',
    };

    const options = { method: Methods.put };

    const { status } = await doRequest(
      `/users/${user.id}`,
      { ...userData },
      options
    );

    const updatedUser = await prisma.user.findFirst({ where: { id: user.id } });

    expect(updatedUser).toEqual({
      ...user,
      name: userData.name,
      id: expect.any(Number),
    });
    expect(status).toBe(200);
  });
});
