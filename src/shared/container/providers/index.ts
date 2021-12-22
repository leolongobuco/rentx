import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/Implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EthrealMailProvider } from "./MailProvider/implementations/EthrealMailProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider,
);

container.registerInstance<IMailProvider>(
  "EthrealMailProvider",
  new EthrealMailProvider(),
);
