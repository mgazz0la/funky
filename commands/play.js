const fs = require('fs');
const ytdl = require('ytdl-core-discord');
const { guildId, audioChannelId } = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioResource, StreamType, AudioPlayerStatus, createAudioPlayer } = require('@discordjs/voice');
const {getInfo} = require('ytdl-core');

module.exports = {
  data:
    new SlashCommandBuilder()
      .setName('play')
      .setDescription('Plays a YT link.')
      .addStringOption(option => option
                                  .setName('link')
                                  .setDescription('YT link to play')
                                  .setRequired(true)),
  async execute(interaction) {
    const connection = joinVoiceChannel({
      channelId: audioChannelId,
      guildId: guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const link = interaction.options.getString('link');
    const stream = ytdl(link, { filter: 'audioonly' });
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

    const player = createAudioPlayer();
    player.on(AudioPlayerStatus.Idle, () => { console.log('Player idle.'); })
    player.on(AudioPlayerStatus.Buffering, () => { console.log('Player buffering.'); })
    player.on(AudioPlayerStatus.Playing, () => { console.log('Player playing.'); })
    player.on(AudioPlayerStatus.AutoPaused, () => { console.log('Player autopaused.'); })
    player.on(AudioPlayerStatus.Paused, () => { console.log('Player paused.'); })
    player.on('error', error => {
      console.error(error.message);
    });

    player.play(resource);
    connection.subscribe(player);

    await interaction.reply(`ok fine here's wonderwall [${link}]`);
  },
};
