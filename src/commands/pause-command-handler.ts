import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { SessionManager } from "../session-manager";

export class PauseCommandHandler {
  private static readonly COMMAND_NAME: string = "pause";

  public static commandName(): string {
    return this.COMMAND_NAME;
  }

  public static builder(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.COMMAND_NAME)
      .setDescription("Pauses the current track");
  }

  public static async do(
    interaction: CommandInteraction,
    sessionManager: SessionManager
  ): Promise<void> {
    if (!interaction.guild || !interaction.guildId) {
      console.log("guild not found");
      return;
    }

    const response: string = await sessionManager.sessionPause(
      interaction.guildId
    );

    if (response) {
      interaction.reply(response);
    }
  }
}
