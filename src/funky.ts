import { DiscordClient } from "./discord/discord-client";
import { InteractionCreateEventHandler } from "./events/interaction-create-event-handler";
import { FunkyConfig } from "./funky-config";
import { SessionManager } from "./session-manager";

export interface BotController {
  pog(): void;
  sessionPlay(sessionId: string, searchTerms: string[]): void;
  sessionPause(sessionId: string): void;
  sessionUnpause(sessionId: string): void;
}

export class Funky {
  readonly discordClient: DiscordClient;
  readonly sessionManager: SessionManager;

  constructor(funkyConfig: FunkyConfig, discordClient: DiscordClient) {
    this.discordClient = discordClient;
    this.sessionManager = new SessionManager();
  }

  async start(): Promise<void> {
    this.discordClient.addEventListener(
      InteractionCreateEventHandler.handleWith(this)
    );

    await this.discordClient.setCommandHandler();
  }
}
