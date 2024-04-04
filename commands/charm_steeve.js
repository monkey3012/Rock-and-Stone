const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior, getVoiceConnection, StreamType, createAudioResource } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');

const { join } = require('node:path');
const fs = require('fs');
const path = require('path');
 
// Directory path where your files are located
const directoryPath = './Voicelines/Steeve/Charming/';
 
// Function to get a random element from an array
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const audioFileExtensions = ['.mp3', '.wav', '.ogg']; // Add more extensions if needed

module.exports = {
    data: new SlashCommandBuilder()
        .setName('charm_steeve')
        .setDescription("I'm gonna call you Steeve!"),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
        
        // Voicelines are taken from https://deeprockgalactic.fandom.com/wiki/Voicelines & https://deeprockgalactic.wiki.gg/wiki/Voicelines
        const audio = [
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_01.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_02.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_03.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_04.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_05.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_06.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_07.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_08.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_09.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_10.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_11.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_12.ogg',
            './Voicelines/Steeve/Charming/PrkActvtnsBeastMaster_13.ogg'
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