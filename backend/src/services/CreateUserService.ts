import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}
export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    // nao precisa criar um repositorio se n tiver uma funcao especifica para o model
    const checkUserExists = await usersRepository.findOne({ where: { email } });
    if (checkUserExists) {
      throw Error('Email address alreader used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}
