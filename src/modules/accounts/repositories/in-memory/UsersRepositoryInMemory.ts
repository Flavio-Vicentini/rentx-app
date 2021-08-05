import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUserRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    password,
    name,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      password,
      name,
    });
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}

export { UsersRepositoryInMemory };
