import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UserMap } from "@modules/accounts/mappers/UserMap";

@injectable()
class ListUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { ListUserProfileUseCase };
