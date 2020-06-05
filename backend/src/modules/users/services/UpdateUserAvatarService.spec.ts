import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRespository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRespository,
      fakeStorageProvider,
    );
  });
  it('should be able to storage file', async () => {
    const user = await fakeUsersRespository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    const avatarFileName = 'photo.png';
    const userUpdated = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName,
    });

    await expect(userUpdated.avatar).toBe(avatarFileName);
  });
  it('should not be able to update avatar from non existing user', async () => {
    const avatarFileName = 'photo.png';

    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRespository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.png',
    });
    await expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    await expect(user.avatar).toBe('avatar2.png');
  });
});
