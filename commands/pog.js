const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder().setName('pog').setDescription('Replies with pog!'),
  async execute(interaction) {
    await interaction.reply(
      interaction.guild.emojis.cache.find(emoji => emoji.name === 'pogsaac').toString());
  },
}
