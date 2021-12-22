import { UsersRespositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRespoitoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersRepositoryInMemory: UsersRespositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRespositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "244456",
      email: "ahisis@fueso.bo",
      name: "Clifford White",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("ahisis@fueso.bo");
    expect(sendMail).toHaveBeenCalled();
  });

  it("sould not be able to send email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("bimo@lagiva.jm"),
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create",
    );

    await usersRepositoryInMemory.create({
      driver_license: "932858",
      email: "zastinze@uduizukah.sl",
      name: "Ada Nichols",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("zastinze@uduizukah.sl");

    expect(generateTokenMail).toBeCalled();
  });
});
