import { Response, Request } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./refreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-acess-token"] ||
      request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
    const newTokens = await refreshTokenUseCase.execute(token);

    return response.json(newTokens);
  }
}

export { RefreshTokenController };
