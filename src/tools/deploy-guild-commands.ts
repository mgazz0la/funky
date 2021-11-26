import { COMMANDS } from "../commands/commands";
import { REST } from "@discordjs/rest";
import { Routes as DiscordRoutes } from "discord-api-types/v9";
import { clientId, guildId, token } from "../../config.json";

const commands = [];
for (const commandHandler of COMMANDS) {
  commands.push(commandHandler.builder().toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

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
