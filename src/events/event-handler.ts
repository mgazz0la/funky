// TODO: Encapsulate these types as like a DiscordPacket or something.
import { Interaction as DiscordInteraction } from "discord.js";
import { FunkyBot } from "../funky";

export type EventHandler = {
  eventName: () => string;
  do: (_: DiscordInteraction, __: FunkyBot) => Promise<void>;
};
