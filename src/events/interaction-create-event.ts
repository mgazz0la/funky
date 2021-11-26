import { Client, Interaction, TextChannel } from "discord.js";
import { COMMANDS } from "../commands/commands";

export class InteractionCreateEvent {
  public static eventName(): string {
    return "interactionCreate";
  }

  public static async do(
    interaction: Interaction,
    client: Client
  ): Promise<void> {
    if (!interaction.isCommand()) {
      console.log("Not a command.");
      return;
    }

    console.log(
      `${interaction.commandName} [${interaction.user.tag} in #${
        (interaction.channel as TextChannel).name
      }]`
    );

    const handler = COMMANDS.find(
      (handler) => handler.commandName() === interaction.commandName
    );

    if (!handler) return;
    try {
      await handler.do(interaction, client);
    } catch (error) {
      console.error(error);
    }
  }
}
