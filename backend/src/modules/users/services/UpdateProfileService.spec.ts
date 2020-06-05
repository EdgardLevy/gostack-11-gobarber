import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRespository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRespository,
      fakeHashProvider,
    );
  });
  it('should be able update profile', async () => {
    const user = await fakeUsersRespository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'User Um',
      email: 'otheremail@provider.com.br',
    });

    await expect(updatedUser.name).toBe('User Um');
    await expect(updatedUser.email).toBe('otheremail@provider.com.br');
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-id',
        name: 'User Um',
        email: 'otheremail@provider.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change another user email', async () => {
    await fakeUsersRespository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });
    const user = await fakeUsersRespository.create({
      name: 'Teste',
      email: 'teste@provider.com.br',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Teste',
        email: 'email@provider.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRespository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'User Um',
      email: 'otheremail@provider.com.br',
      old_password: '123123',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRespository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'User Um',
        email: 'otheremail@provider.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRespository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'User Um',
        email: 'otheremail@provider.com.br',
        old_password: 'wrong-old-password',
        password: '222222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
