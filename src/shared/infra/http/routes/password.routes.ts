import { Router } from "express";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailForgotController =
  new SendForgotPasswordMailController();

passwordRoutes.post("/forgot", sendForgotPasswordMailForgotController.handle);

export { passwordRoutes };
