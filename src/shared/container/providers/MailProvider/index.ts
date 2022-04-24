import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EthrealMailProvider } from "./implementations/EthrealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
  ehtereal: container.resolve(EthrealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER],
);
