import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { SessionManager } from "../session-manager";

export class UnpauseCommandHandler {
  private static readonly COMMAND_NAME: string = "unpause";

  public static commandName(): string {
    return this.COMMAND_NAME;
  }

  public static builder(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.COMMAND_NAME)
      .setDescription("Unpauses the current track, if any");
  }

  public static async do(
    interaction: CommandInteraction,
    sessionManager: SessionManager
  ): Promise<void> {
    if (!interaction.guild || !interaction.guildId) {
      console.log("guild not found");
      return;
    }

    const response: string = await sessionManager.sessionUnpause(
      interaction.guildId
    );

    if (response) {
      interaction.reply(response);
    }
  }
}
