import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { SessionManager } from "../session-manager";

export class PlayCommandHandler {
  public static commandName(): string {
    return "play";
  }

  public static builder(): SlashCommandBuilder {
    const builder = new SlashCommandBuilder()
      .setName("play")
      .setDescription("Plays a YT link.");
    builder.addStringOption((option) =>
      option.setName("link").setDescription("YT link to play").setRequired(true)
    );

    return builder;
  }

  public static async do(
    interaction: CommandInteraction,
    sessionManager: SessionManager
  ): Promise<void> {
    if (!interaction.guild || !interaction.guildId) {
      console.log("Guild not found!");
      return;
    }
    const guildId = interaction.guildId;

    const link = interaction.options.getString("link");
    if (!link) {
      console.log("error receiving url");
      return;
    }

    interaction.reply(
      await sessionManager.sessionPlay(guildId, link, interaction)
    );
  }
}
