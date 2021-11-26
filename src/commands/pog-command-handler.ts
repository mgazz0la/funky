import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export class PogCommandHandler {
  public static commandName(): string {
    return "pog";
  }

  public static builder(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName("pog")
      .setDescription("Replies with pog!");
  }

  public static async do(interaction: CommandInteraction): Promise<void> {
    if (!interaction.guild) {
      console.log("guild not found");
      return;
    }

    await interaction.reply(
      interaction.guild.emojis.cache
        .find((emoji) => emoji.name === "pogsaac")
        ?.toString() ?? ":open_mouth:"
    );
  }
}
