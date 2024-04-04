const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior, getVoiceConnection, StreamType, createAudioResource } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');

const { join } = require('node:path');
const fs = require('fs');
const path = require('path');


// Directory path where your files are located
const directoryPath = './Voicelines/Shouts/Dwarf Shout While Holding a Beer/';
 
// Function to get a random element from an array
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const audioFileExtensions = ['.mp3', '.wav', '.ogg']; // Add more extensions if needed

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beer_shout')
        .setDescription('Last one to finish is a pointy-eared Leaf Lover.'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);

        // Voicelines are taken from https://deeprockgalactic.fandom.com/wiki/Voicelines & https://deeprockgalactic.wiki.gg/wiki/Voicelines
        const audio = [
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_01.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_02.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_03.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_04.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_05.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_06.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_07.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_08.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_09.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_10.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_11.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_12.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_13.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_14.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_15.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_16.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_17.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_18.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_19.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_020.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_021.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_022.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_023.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_024.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_025.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_026.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_027.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_028.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_029.ogg', 
            './Voicelines/Shouts/Dwarf Shout While Holding a Beer/BarCheering_when_drinking_030.ogg'
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