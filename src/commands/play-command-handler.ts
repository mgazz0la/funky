import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { SessionManager } from "../session-manager";
import * as yt from "youtube-search-without-api-key";

export class PlayCommandHandler {
  private static readonly COMMAND_NAME: string = "play";
  public static commandName(): string {
    return this.COMMAND_NAME;
  }

  public static builder(): SlashCommandBuilder {
    const builder = new SlashCommandBuilder()
      .setName(this.COMMAND_NAME)
      .setDescription("Plays a YT link.");
    builder.addStringOption((option) =>
      option
        .setName("song")
        .setDescription("Name of (or URL for) the song to play")
        .setRequired(true)
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

    let song: string = interaction.options.getString("song") || "";
    if (!song) {
      interaction.reply("You must specify a song to play!");
      return;
    }

    if (
      !song.match(
        /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/
      )
    ) {
      song = (await yt.search(song))[0].snippet.url;
    }

    const response: string = await sessionManager.sessionPlay(
      guildId,
      song,
      interaction
    );
    if (response) {
      interaction.reply(response);
    }
  }
}
