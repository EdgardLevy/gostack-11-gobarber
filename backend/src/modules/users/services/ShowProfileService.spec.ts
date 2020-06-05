import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRespository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRespository);
  });
  it('should be able show profile', async () => {
    const user = await fakeUsersRespository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    const userShowed = await showProfileService.execute({
      user_id: user.id,
    });

    await expect(userShowed.name).toBe('User 1');
  });
  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
