import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    await expect(user).toHaveProperty('id');
  });
  it('should not be able to create two users with the same email', async () => {
    const email = 'email@provider.com';

    await createUser.execute({
      name: 'User 1',
      email,
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'User 1',
        email,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
