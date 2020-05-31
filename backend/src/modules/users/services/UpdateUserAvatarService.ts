import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only athenticated users can change avatar.');
    }

    // if (user.avatar) {
    //   const userAvatarFilePath = path.join(uploadConfig.tmpFolder, user.avatar);
    //   const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
    //   if (userAvatarFileExists) {
    //     await fs.promises.unlink(userAvatarFilePath);
    //   }
    // }
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}
