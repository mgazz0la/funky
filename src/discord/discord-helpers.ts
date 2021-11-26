import { GuildMember, Interaction as DiscordInteraction } from "discord.js";

export class DiscordHelpers {
  public static findActiveVoiceChannelIdForInteracter(
    interaction: DiscordInteraction
  ): string {
    console.log((interaction.member as GuildMember).voice);
    return (interaction.member as GuildMember).voice.channelId ?? "";
  }
}
