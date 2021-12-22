import { Router } from "express";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";

const passwordRoutes = Router();

const sendForgotPasswordMailForgotController =
  new SendForgotPasswordMailController();

const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailForgotController.handle);

passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
