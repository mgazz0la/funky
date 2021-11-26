// TODO: Encapsulate these types as like a DiscordCommandPacket or something.
import { SlashCommandBuilder as DiscordSlashCommandBuilder } from "@discordjs/builders";
import {
  Client as DiscordClient,
  CommandInteraction as DiscordCommandInteraction,
} from "discord.js";

export type CommandHandler = {
  commandName: () => string;
  builder: () => DiscordSlashCommandBuilder;
  do: (_: DiscordCommandInteraction, __: DiscordClient) => Promise<void>;
};
