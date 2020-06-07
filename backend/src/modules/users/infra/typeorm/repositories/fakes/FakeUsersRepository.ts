import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import IUsersRespository from '../../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../../dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRespository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;
    if (except_user_id)
      users = this.users.filter(user => user.id !== except_user_id);
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findUserIdx = this.users.findIndex(item => item.id === user.id);
    this.users[findUserIdx] = user;
    return user;
  }
}

export default FakeUsersRepository;
