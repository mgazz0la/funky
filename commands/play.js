const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder().setName('play').setDescription('Plays a YT link.'),
  async execute(interaction) {
    await interaction.reply('Unimplemented. :(');
  },
};
