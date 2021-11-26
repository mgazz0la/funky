// TODO: Encapsulate these types as like a DiscordCommandPacket or something.
import { SlashCommandBuilder as DiscordSlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction as DiscordCommandInteraction } from "discord.js";
import { SessionManager } from "../session-manager";

export type CommandHandler = {
  commandName: () => string;
  builder: () => DiscordSlashCommandBuilder;
  do: (_: DiscordCommandInteraction, __: SessionManager) => Promise<void>;
};
