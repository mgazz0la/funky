import { Client as DiscordClient } from "discord.js";
import { DiscordIntents } from "./discord/discord-intents";
import { Funky } from "./funky";

const discordClient: DiscordClient = new DiscordClient({
  intents: DiscordIntents.FUNKYBOT_INTENTS,
});

const funkyBot = new Funky(discordClient);

funkyBot
  .start()
  .then(() => console.log("OK"))
  .catch((e) => console.error(e));
