import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { CommandHandler } from "./CommandHandler";

export class PogCommandHandler extends CommandHandler {
  public name(): string {
    return "pog";
  }

  public builder(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName("pog")
      .setDescription("Replies with pog!");
  }

  public async do(interaction: CommandInteraction): Promise<void> {
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
