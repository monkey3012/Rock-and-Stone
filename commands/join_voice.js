const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer, NoSubscriberBehavior, getVoiceConnection, StreamType, createAudioResource } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');

const { join } = require('node:path');
const fs = require('fs');
const path = require('path');


// Directory path where your files are located
const directoryPath = './Voicelines/Dwarf Selection/Driller/';
 
// Function to get a random element from an array
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const audioFileExtensions = ['.mp3', '.wav', '.ogg']; // Add more extensions if needed

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins specified voice channel')
        .addChannelOption((option) =>
         option
            .setName('channel')
            .setDescription('The channel to join')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)
        ),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
        const voiceChannel = interaction.options.getChannel('channel');
        const voiceConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        const audio = [
            './Voicelines/Dwarf Selection/Driller/CharSelDrill_1.ogg',
            './Voicelines/Dwarf Selection/Driller/CharSelDrill_2.ogg',
            './Voicelines/Dwarf Selection/Driller/CharSelDrill_3.ogg',
            './Voicelines/Dwarf Selection/Driller/CharSelDrill_4.ogg',
            './Voicelines/Dwarf Selection/Driller/CharSelDrill_5.ogg',
            './Voicelines/Dwarf Selection/Driller/CharSelDrill_6.ogg',
            './Voicelines/Dwarf Selection/Driller/CharSelDrill_7.ogg',
            './Voicelines/Dwarf Selection/Driller/CharSelDrill_8.ogg',
            './Voicelines/Dwarf Selection/Driller/CharSelDrill_9.ogg',
            './Voicelines/Dwarf Selection/Driller/CharSelDrill_10.ogg'
            ];

            fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
                if (err) {
                    console.error('Error reading directory:', err);
                    return;
                }
                const filePaths = files
                .filter(file => file.isFile() && audioFileExtensions.includes(path.extname(file.name).toLowerCase()))
                .map(file => file.name);
    
                if (filePaths.length === 0) {
                    console.log('No files found in the directory.');
                    return;
                    }
            });
            const random = Math.floor(Math.random() * audio.length);
            console.log('random file:',audio[random]); 

            const audioFile = audio[random];
            
            const resource = createAudioResource(audioFile.toString());
        
            const connection = getVoiceConnection(interaction.guildId);

            const player = createAudioPlayer();

            const subscription = connection.subscribe(player);

            player.play(resource);

            console.log(resource)
    },
};