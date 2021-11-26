// TODO: Encapsulate these types as like a DiscordPacket or something.
import {
  Client as DiscordClient,
  Interaction as DiscordInteraction,
} from "discord.js";

export type EventHandler = {
  eventName: () => string;
  do: (_: DiscordInteraction, __: DiscordClient) => Promise<void>;
};
