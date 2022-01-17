import { DiscordClient } from "./discord/discord-client";
import { Funky } from "./funky";
import config from "../config.json";
import { FunkyConfig } from "./funky-config";

const funkyConfig = config as FunkyConfig;
const funkyBot = new Funky(funkyConfig, new DiscordClient(funkyConfig.discord));

funkyBot
  .start()
  .then(() => console.log("OK"))
  .catch((e) => console.error(e));
