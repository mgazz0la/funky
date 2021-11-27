import { DiscordHelpers } from "./discord/discord-helpers";
import { DiscordSession } from "./session/discord-session";
import memoryCache, { CacheClass } from "memory-cache";
import { Interaction as DiscordInteraction } from "discord.js";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  StreamType,
} from "@discordjs/voice";
import { YoutubeHelpers } from "./youtube/youtube-helpers";

export class SessionManager {
  private discordSessionCache: CacheClass<string, DiscordSession> =
    new memoryCache.Cache();

  private createDiscordSession(discordGuildId: string): void {
    if (this.discordSessionCache.get(discordGuildId)) {
      return;
    }

    this.discordSessionCache.put(
      discordGuildId,
      new DiscordSession(discordGuildId)
    );
  }

  public async sessionPlay(
    discordGuildId: string,
    url: string,
    interaction: DiscordInteraction
  ): Promise<string> {
    if (!interaction.guild) {
      throw Error("poop");
    }

    let session = this.discordSessionCache.get(discordGuildId);

    if (!session) {
      this.createDiscordSession(discordGuildId);
      session = this.discordSessionCache.get(discordGuildId);
      if (!session) {
        throw Error("how");
      }
    }

    const audioResource = createAudioResource(
      YoutubeHelpers.audioStreamForUrl(url),
      {
        inputType: StreamType.Arbitrary,
      }
    );

    if (!session.voiceConnection || !session.player) {
      const audioChannelId =
        DiscordHelpers.findActiveVoiceChannelIdForInteracter(interaction);
      if (!audioChannelId) {
        return "Join an audio channel first!";
      }
      session.voiceConnection = joinVoiceChannel({
        channelId: audioChannelId,
        guildId: discordGuildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      session.player = createAudioPlayer();
      session.player.play(audioResource);

      session.voiceConnection.subscribe(session.player);
    } else {
      session.player.stop();
      session.player.play(audioResource);
    }

    return `playing [${url}]`;
  }

  public async sessionPause(discordGuildId: string): Promise<string> {
    const session = this.discordSessionCache.get(discordGuildId);
    if (
      !session ||
      !session.voiceConnection ||
      !session.player ||
      session.player.state.status !== AudioPlayerStatus.Playing
    ) {
      return "Nothing is currently playing, ya dingus";
    } else {
      session.player.pause();
      return "shhh";
    }
  }

  public async sessionUnpause(discordGuildId: string): Promise<string> {
    const session = this.discordSessionCache.get(discordGuildId);
    if (
      !session ||
      !session.voiceConnection ||
      !session.player ||
      session.player.state.status !== AudioPlayerStatus.Paused
    ) {
      return "Nothing is currently paused, ya dingus";
    } else {
      session.player.unpause();
      return ":call_me: it's lit fam";
    }
  }
}
