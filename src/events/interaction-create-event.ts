import {
  Interaction as DiscordInteraction,
  TextChannel as DiscordTextChannel,
} from "discord.js";
import { COMMANDS } from "../commands/commands";
import { FunkyBot } from "../funky";

export class InteractionCreateEvent {
  public static eventName(): string {
    return "interactionCreate";
  }

  public static async do(
    interaction: DiscordInteraction,
    funkyBot: FunkyBot
  ): Promise<void> {
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
      await handler.do(interaction, funkyBot.sessionManager);
    } catch (error) {
      console.error(error);
    }
  }
}
