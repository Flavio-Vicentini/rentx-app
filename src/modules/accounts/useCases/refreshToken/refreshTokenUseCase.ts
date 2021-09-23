import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}
interface IResponseToken {
  refresh_token: string;
  access_token: string;
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private daysjsDateProvider: IDateProvider
  ) {}
  async execute(refresh_token: string): Promise<IResponseToken> {
    const { email, sub: user_id } = verify(
      refresh_token,
      auth.secret_refresh_token
    ) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      refresh_token
    );
    if (!userToken) {
      throw new AppError("Refresh Token does not exists.");
    }
    await this.usersTokensRepository.deleteById(user_id);

    const new_refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });
    const expires_date = this.daysjsDateProvider.addDays(
      auth.expires_refesh_token_days
    );

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: new_refresh_token,
      expires_date,
    });

    const access_token = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      access_token,
      refresh_token: new_refresh_token,
    };
  }
}

export { RefreshTokenUseCase };
