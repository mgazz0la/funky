module.exports = {
  name: 'interactionCreate',
  async execute(client, interaction) {
    if (!interaction.isCommand()) return;
    console.log(
      `${interaction.commandName} [${interaction.user.tag} in #${interaction.channel.name}]`);

    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
    }
    catch (error) {
      console.error(error);
    }
  },
};
