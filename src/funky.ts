import {
  Client as DiscordClient,
  Interaction as DiscordInteraction,
} from "discord.js";
import { FunkyConfig } from "./funky-config";
import { DiscordEvents } from "./discord/discord-events";
import { EVENTS } from "./events/events";
import { SessionManager } from "./session-manager";

interface FunkyBot {
  readonly discordClient?: DiscordClient;
  readonly sessionManager: SessionManager;
}

class Funky implements FunkyBot {
  readonly funkyConfig: FunkyConfig;
  readonly discordClient: DiscordClient;
  readonly sessionManager: SessionManager;

  constructor(funkyConfig: FunkyConfig, discordClient: DiscordClient) {
    this.funkyConfig = funkyConfig;
    this.discordClient = discordClient;
    this.sessionManager = new SessionManager();

    // init'ing that doesn't rely on `this.discordClient` should go here (rather than #start())
  }

  async start(): Promise<void> {
    if (!this.discordClient) {
      throw Error("Operation unsupported without a Discord client.");
    }

    this.discordClient.on(
      DiscordEvents.EVENT_INTERACTION_CREATE,
      (interaction: DiscordInteraction) => {
        // The transpiler forgets that `this.discordClient` is non-null in this context, so we
        // re-assert to make the transpiler feel better.
        if (!this.discordClient) {
          throw Error("Operation unsupported without a Discord client.");
        }

        EVENTS.find(
          (handler) =>
            handler.eventName() === DiscordEvents.EVENT_INTERACTION_CREATE
        )?.do(interaction, this); // TODO: don't use `?` here
      }
    );

    this.discordClient.login(this.funkyConfig.discord.token);
  }
}

export { Funky, FunkyBot };
