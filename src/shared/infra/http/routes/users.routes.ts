import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/createUserController";
import { ListUserProfileController } from "@modules/accounts/useCases/listUserProfile/ListUserProfileController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateuserAvatar/updateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listUserProfileController = new ListUserProfileController();
const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
usersRoutes.get(
  "/profile",
  ensureAuthenticated,
  listUserProfileController.handle
);

export { usersRoutes };
