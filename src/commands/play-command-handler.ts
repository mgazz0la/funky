import {
  joinVoiceChannel,
  createAudioResource,
  StreamType,
  createAudioPlayer,
  AudioPlayerStatus,
} from "@discordjs/voice";
import { CommandInteraction } from "discord.js";
import ytdl = require("ytdl-core");
import { guildId, audioChannelId } from "../../config.json";
import { SlashCommandBuilder } from "@discordjs/builders";

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

  public static async do(interaction: CommandInteraction): Promise<void> {
    if (!interaction.guild) {
      console.log("guild not found");
      return;
    }

    const connection = joinVoiceChannel({
      channelId: audioChannelId,
      guildId: guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const link = interaction.options.getString("link");
    if (!link) {
      console.log("error receiving url");
      return;
    }
    const stream = ytdl(link, { filter: "audioonly" });
    const resource = createAudioResource(stream, {
      inputType: StreamType.Arbitrary,
    });

    const player = createAudioPlayer();

    player.on(AudioPlayerStatus.Idle, () => {
      console.log("Player idle.");
    });
    player.on(AudioPlayerStatus.Buffering, () => {
      console.log("Player buffering.");
    });
    player.on(AudioPlayerStatus.Playing, () => {
      console.log("Player playing.");
    });
    player.on(AudioPlayerStatus.AutoPaused, () => {
      console.log("Player autopaused.");
    });
    player.on(AudioPlayerStatus.Paused, () => {
      console.log("Player paused.");
    });
    player.on("error", (error) => {
      console.error(error.message);
    });

    player.play(resource);
    connection.subscribe(player);

    await interaction.reply(`ok fine here's wonderwall [${link}]`);
  }
}
