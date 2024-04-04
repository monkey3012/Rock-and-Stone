const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior, getVoiceConnection, StreamType, createAudioResource } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');

const { join } = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rich')
        .setDescription("We're rich!"),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
            
        const resource = createAudioResource('./Voicelines/Laserpointer/Other/Rich/Laserpoint_Misc_17_WereRich.ogg');
        
        const connection = getVoiceConnection(interaction.guildId);

        const player = createAudioPlayer();

        const subscription = connection.subscribe(player);

        player.play(resource);

        console.log(resource)

    },
};