import { Client as DiscordClient } from "discord.js";
import { DiscordIntents } from "./discord/discord-intents";
import { Funky } from "./funky";
import config from "../config.json";
import { FunkyConfig } from "./funky-config";

const funkyConfig = config as FunkyConfig;
const discordClient: DiscordClient = new DiscordClient({
  intents: DiscordIntents.FUNKYBOT_INTENTS,
});

const funkyBot = new Funky(funkyConfig, discordClient);

funkyBot
  .start()
  .then(() => console.log("OK"))
  .catch((e) => console.error(e));
