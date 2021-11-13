import { Client, Interaction, TextChannel } from "discord.js";
import { CommandHandler } from "../commands/CommandHandler";
import { PlayCommandHandler } from "../commands/PlayCommandHandler";
import { PogCommandHandler } from "../commands/PogCommandHandler";
import { EventHandler } from "./EventHandler";

export class InteractionCreateEvent extends EventHandler {
  HANDLERS: { [key: string]: CommandHandler } = {
    play: new PlayCommandHandler(),
    pog: new PogCommandHandler(),
  };

  public name(): string {
    return "interactionCreate";
  }

  public async do(interaction: Interaction, client: Client): Promise<void> {
    if (!interaction.isCommand()) {
      console.log("Not a command.");
      return;
    }

    console.log(
      `${interaction.commandName} [${interaction.user.tag} in #${
        (interaction.channel as TextChannel).name
      }]`
    );

    const handler = this.HANDLERS[interaction.commandName];
    if (!handler) return;
    try {
      await handler.do(interaction, client);
    } catch (error) {
      console.error(error);
    }
  }
}
