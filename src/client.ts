import { Client, Intents, Interaction } from "discord.js";
import { token } from "../config.json";
import { InteractionCreateEvent } from "./events/InteractionCreateEvent";

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const interactionCreateHandler = new InteractionCreateEvent();

client.on("interactionCreate", async function (interaction: Interaction) {
  await interactionCreateHandler.do(interaction, client);
});

// Login to Discord with your client's token
client
  .login(token)
  .then(() => console.log("OK"))
  .catch((err) => console.error(err));
