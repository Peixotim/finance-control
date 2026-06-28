import { AppDataSource } from "../../../infra/database";
import { CreateUserDTO } from "../DTOs/user-create.dto";
import { UpdateUserDTO } from "../DTOs/user-update.dto";
import { User } from "../entity/users.entity";

export class UserRepository {
  private readonly repository = AppDataSource.getRepository(User);

  public async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
    });
  }

  public async create(payload: CreateUserDTO): Promise<User> {
    const u = this.repository.create(payload);
    return await this.repository.save(u);
  }

  public async update(
    id: string,
    payload: UpdateUserDTO,
  ): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) return null;

    this.repository.merge(user, payload);
    return await this.repository.save(user);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
