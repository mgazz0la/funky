import { Command } from "./commands/command";

export interface CommandHandler {
  handle(command: Command): Promise<void>;
}
