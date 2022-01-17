import { Client, CommandInteraction, Intents, Interaction } from "discord.js";
import { CommandHandler } from "../command-handler";
import { COMMANDS } from "../commands/commands";
import { InteractionCreateEventHandler } from "../events/interaction-create-event-handler";
import { DiscordConfig } from "../funky-config";
import { DiscordEventHandler } from "./discord-event-handler";

export class DiscordClient {
  private readonly _FUNKYBOT_INTENTS: Intents = new Intents([
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ]);

  private readonly _EVENT_INTERACTION_CREATE = "interactionCreate";

  private readonly _client: Client;
  private readonly _discordConfig: DiscordConfig;
  private readonly _commandHandler: CommandHandler;

  constructor(discordConfig: DiscordConfig, commandHandler: CommandHandler) {
    this._discordConfig = discordConfig;
    this._commandHandler = commandHandler;

    this._client = new Client({ intents: this._FUNKYBOT_INTENTS });
    this._client.on(
      this._EVENT_INTERACTION_CREATE,
      (interaction: Interaction) => {
        const command = COMMANDS.find(
          (h) =>
            h.commandName() === (interaction as CommandInteraction).commandName
        );

        if (!command) {
          // log sth
          return;
        }

        this._commandHandler.handle(command);
      }
    );
  }

  async listenWith(): Promise<void> {
    await this._client.login(this._discordConfig.token);
  }
}
