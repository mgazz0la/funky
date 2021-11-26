import { AudioPlayer, VoiceConnection } from "@discordjs/voice";

export class DiscordSession {
  public readonly discordGuildId: string;
  public voiceConnection: VoiceConnection | undefined;
  public player: AudioPlayer | undefined;

  constructor(discordGuildId: string) {
    this.discordGuildId = discordGuildId;
  }
}
