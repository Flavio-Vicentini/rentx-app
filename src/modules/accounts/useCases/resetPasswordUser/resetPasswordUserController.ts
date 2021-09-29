import { Response, Request } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./resetPasswordUserUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;
    const { token } = request.query;
    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );
    await resetPasswordUserUseCase.execute({
      password,
      token: token.toString(),
    });
    return response.send();
  }
}

export { ResetPasswordUserController };
