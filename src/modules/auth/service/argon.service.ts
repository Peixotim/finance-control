import * as argon2 from "argon2";

export class ArgonService {
  private readonly options: argon2.Options = {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  };

  public async hash(password: string): Promise<string> {
    return await argon2.hash(password, this.options);
  }

  public async verify(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}
