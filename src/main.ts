import { Client as DiscordClient } from "discord.js";
import { DiscordIntents } from "./discord/discord-intents";
import { FunkyBot } from "./funky";

const discordClient: DiscordClient = new DiscordClient({
  intents: DiscordIntents.FUNKYBOT_INTENTS,
});

const funkyBot = new FunkyBot(discordClient);

funkyBot
  .start()
  .then(() => console.log("OK"))
  .catch((e) => console.error(e));
