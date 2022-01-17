import {
  Interaction as DiscordInteraction,
  TextChannel as DiscordTextChannel,
} from "discord.js";
import { COMMANDS } from "../commands/commands";
import { DiscordEventHandler } from "../discord/discord-event-handler";
import { BotManager } from "../funky";

export class InteractionCreateEventHandler {
  public static handleWith(botManager: BotManager): DiscordEventHandler {
    return async (interaction: DiscordInteraction) => {
      if (!interaction.isCommand()) {
        console.log("Not a command.");
        return;
      }

      console.log(
        `${interaction.commandName} [${interaction.user.tag} in #${
          (interaction.channel as DiscordTextChannel).name
        }]`
      );

      const handler = COMMANDS.find(
        (handler) => handler.commandName() === interaction.commandName
      );

      if (!handler) return;
      try {
        await handler.do(interaction, botManager.sessionManager);
      } catch (error) {
        console.error(error);
      }
    };
  }
}
