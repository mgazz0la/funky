import { Client as DiscordClient, Interaction } from "discord.js";
import { token } from "../config.json";
import { DiscordEvents } from "./discord/discord-events";
import { EVENTS } from "./events/events";
import { InteractionCreateEvent } from "./events/interaction-create-event";

export class FunkyBot {
  // It's perfectly fine to instantiate FunkyBot without a DiscordClient, but the #start() method
  // will throw an exception if called.
  //
  // Consider this class to be in a "data-only" mode when this variable is undefined.
  readonly discordClient?: DiscordClient;

  constructor(discordClient?: DiscordClient) {
    this.discordClient = discordClient;

    // init'ing that doesn't rely on `this.discordClient` should go here (rather than #start())
  }

  async start(): Promise<void> {
    if (!this.discordClient) {
      throw Error("Operation unsupported without a Discord client.");
    }

    this.discordClient.on(
      DiscordEvents.EVENT_INTERACTION_CREATE,
      (interaction: Interaction) => {
        // The transpiler forgets that `this.discordClient` is non-null in this context, so we
        // re-assert to make the transpiler feel better.
        if (!this.discordClient) {
          throw Error("Operation unsupported without a Discord client.");
        }

        EVENTS.find(
          (handler) =>
            handler.eventName() === DiscordEvents.EVENT_INTERACTION_CREATE
        )?.do(interaction, this.discordClient); // TODO: don't use `?` here
      }
    );

    this.discordClient.login(token);
  }
}
