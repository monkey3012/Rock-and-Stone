const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior, getVoiceConnection, StreamType, createAudioResource } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');

const { join } = require('node:path');
const fs = require('fs');
const path = require('path');
 
// Directory path where your files are located
const directoryPath = './Voicelines/Dwarf Salute/';
 
// Function to get a random element from an array
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const audioFileExtensions = ['.mp3', '.wav', '.ogg']; // Add more extensions if needed

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rock')
        .setDescription('Rock and Stone!'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
        
        // Voicelines are taken from https://deeprockgalactic.fandom.com/wiki/Voicelines & https://deeprockgalactic.wiki.gg/wiki/Voicelines
        const audio = [
            './Voicelines/Dwarf Salute/NEW_Saluting_1.ogg',
            './Voicelines/Dwarf Salute/NEW_Saluting_2.ogg',
            './Voicelines/Dwarf Salute/NEW_Saluting_3.ogg',
            './Voicelines/Dwarf Salute/NEW_Saluting_4.ogg',
            './Voicelines/Dwarf Salute/NEW_Saluting_5.ogg',
            './Voicelines/Dwarf Salute/NEW_Saluting_6.ogg',
            './Voicelines/Dwarf Salute/NEW_Saluting_7.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute_01.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute_02.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute_03.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute_04.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute_05.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute_06.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute_07.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute_08.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute_09.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute_10.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_01.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_02.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_03.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_04.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_05.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_06.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_07.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_08.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_09.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_10.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_11.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_12.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_13.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_14.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_15.ogg',
            './Voicelines/Dwarf Salute/RockAndStoneSalute3rdPickup_16.ogg',
            './Voicelines/Dwarf Salute/Saluting2_1.ogg',
            './Voicelines/Dwarf Salute/Saluting2_2.ogg',
            './Voicelines/Dwarf Salute/Saluting2_3.ogg',
            './Voicelines/Dwarf Salute/Saluting2_4.ogg',
            './Voicelines/Dwarf Salute/Saluting2_5.ogg',
            './Voicelines/Dwarf Salute/Saluting2_6.ogg',
            './Voicelines/Dwarf Salute/Saluting2_7.ogg',
            './Voicelines/Dwarf Salute/Saluting2_8.ogg',
            './Voicelines/Dwarf Salute/Saluting2_9.ogg',
            './Voicelines/Dwarf Salute/Saluting2_11.ogg',
            './Voicelines/Dwarf Salute/Saluting2_12.ogg',
            './Voicelines/Dwarf Salute/Saluting2_13.ogg',
            './Voicelines/Dwarf Salute/Saluting2_15.ogg',
            './Voicelines/Dwarf Salute/Saluting2_16.ogg',
            './Voicelines/Dwarf Salute/Saluting2_17.ogg',
            './Voicelines/Dwarf Salute/Saluting2_18.ogg',
            './Voicelines/Dwarf Salute/Saluting2_19.ogg'
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