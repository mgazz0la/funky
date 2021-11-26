import { Intents } from "discord.js";

export class DiscordIntents {
  static readonly FUNKYBOT_INTENTS: Intents = new Intents([
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ]);
}
