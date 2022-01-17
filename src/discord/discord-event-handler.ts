import { Interaction } from "discord.js";

export type DiscordEventHandler = (interaction: Interaction) => Promise<void>;
