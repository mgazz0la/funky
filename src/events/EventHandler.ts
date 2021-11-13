import { Client, Interaction } from "discord.js";

export abstract class EventHandler {
  public abstract name(): string;
  public abstract do(interaction: Interaction, client: Client): Promise<void>;
}
