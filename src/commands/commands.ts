import { CommandHandler } from "./command-handler";
import { PauseCommandHandler } from "./pause-command-handler";
import { PlayCommandHandler } from "./play-command-handler";
import { PogCommandHandler } from "./pog-command-handler";
import { UnpauseCommandHandler } from "./unpaused-command-handler";

export const COMMANDS: CommandHandler[] = [
  PogCommandHandler,
  PlayCommandHandler,
  PauseCommandHandler,
  UnpauseCommandHandler,
];
