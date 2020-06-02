import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import { uuid } from 'uuidv4';
import UserToken from '../../entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private tokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      user_id,
      id: uuid(),
      token: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.tokens.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.tokens.find(findToken => findToken.token === token);
  }
}

export default FakeUserTokensRepository;
