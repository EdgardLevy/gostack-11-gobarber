import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRespository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(
      fakeUsersRespository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRespository.create({
      name: 'User 2',
      email: 'email2@provider.com.br',
      password: '321',
    });

    const user2 = await fakeUsersRespository.create({
      name: 'User 3',
      email: 'email3@provider.com.br',
      password: '3333',
    });

    const userLogged = await fakeUsersRespository.create({
      name: 'User Logged',
      email: 'user@provider.com.br',
      password: 'unknow password',
    });

    const providers = await listProvidersService.execute({
      user_id: userLogged.id,
    });

    expect(providers).toStrictEqual([user1, user2]);
  });
});
