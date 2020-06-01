import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  to: string;
  body: string;
}
@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ to, body }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(to);
    if (!user) throw new AppError('User does not exists');

    const token = await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendEmail(to, body);
  }
}
