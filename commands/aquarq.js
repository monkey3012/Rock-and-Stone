const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior, getVoiceConnection, StreamType, createAudioResource } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');

const { join } = require('node:path');
const fs = require('fs');
const path = require('path');


// Directory path where your files are located
const directoryPath = './Voicelines/Laserpointer/Aquarq/';
 
// Function to get a random element from an array
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const audioFileExtensions = ['.mp3', '.wav', '.ogg']; // Add more extensions if needed

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aquarq')
        .setDescription('Found an Aquarq!'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);

        // Voicelines are taken from https://deeprockgalactic.fandom.com/wiki/Voicelines & https://deeprockgalactic.wiki.gg/wiki/Voicelines
        const audio = [
            './Voicelines/Laserpointer/Aquarq/Laserpoint_Crafting_Materiels_-_Pickups_13.ogg',
            './Voicelines/Laserpointer/Aquarq/Laserpoint_Crafting_Materiels_-_Pickups_14.ogg',
            './Voicelines/Laserpointer/Aquarq/Laserpoint_Crafting_Materiels_-_Pickups_15.ogg'
            
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