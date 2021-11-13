import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";

export abstract class CommandHandler {
  public abstract name(): string;
  public abstract builder(): SlashCommandBuilder;
  public abstract do(
    interaction: CommandInteraction,
    client: Client
  ): Promise<void>;
}
