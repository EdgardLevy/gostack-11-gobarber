import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import { uuid } from 'uuidv4';
import UserToken from '../../entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private tokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, { user_id, id: uuid(), token: uuid() });
    this.tokens.push(userToken);
    return userToken;
  }
}

export default FakeUserTokensRepository;
