import { CommandHandler } from "./CommandHandler";
import { PlayCommandHandler } from "./PlayCommandHandler";
import { PogCommandHandler } from "./PogCommandHandler";

export const Commands: Array<typeof CommandHandler> = [
  PogCommandHandler,
  PlayCommandHandler,
];
