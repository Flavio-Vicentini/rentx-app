import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListUserProfileUseCase } from "./ListUserProfileUseCase";

class ListUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listUserProfileUseCase = container.resolve(ListUserProfileUseCase);
    console.log(listUserProfileUseCase);
    console.log("awui");
    const user = await listUserProfileUseCase.execute(id);
    console.log(user);
    return response.json(user);
  }
}

export { ListUserProfileController };
