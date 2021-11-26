import { CommandHandler } from "./command-handler";
import { PlayCommandHandler } from "./play-command-handler";
import { PogCommandHandler } from "./pog-command-handler";

export const COMMANDS: CommandHandler[] = [
  PogCommandHandler,
  PlayCommandHandler,
];
