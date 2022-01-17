import { COMMANDS } from "../commands/commands";
import { REST } from "@discordjs/rest";
import { Routes as DiscordRoutes } from "discord-api-types/v9";
import config from "../../config.json";
import { FunkyConfig } from "../funky-config";

const funkyConfig: FunkyConfig = config as FunkyConfig;
if (!funkyConfig.discord.commandDeployment) {
  console.error("Please set a clientId and guildId to deploy to");
  process.exit(1);
}
const clientId = funkyConfig.discord.commandDeployment.clientId;
const guildId = funkyConfig.discord.commandDeployment.guildId;

const commands = [];
for (const commandHandler of COMMANDS) {
  commands.push(commandHandler.builder().toJSON());
}

const rest = new REST({ version: "9" }).setToken(funkyConfig.discord.token);

(async () => {
  try {
    await rest.put(DiscordRoutes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
