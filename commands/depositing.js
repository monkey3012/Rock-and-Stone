const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior, getVoiceConnection, StreamType, createAudioResource } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');

const { join } = require('node:path');
const fs = require('fs');
const path = require('path');


// Directory path where your files are located
const directoryPath = './Voicelines/MULE/Depositing into the M.U.L.E/';
 
// Function to get a random element from an array
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const audioFileExtensions = ['.mp3', '.wav', '.ogg']; // Add more extensions if needed

module.exports = {
    data: new SlashCommandBuilder()
        .setName('depositing')
        .setDescription('Mmm... Could really go for a cold brew right now! '),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);

        // Voicelines are taken from https://deeprockgalactic.fandom.com/wiki/Voicelines & https://deeprockgalactic.wiki.gg/wiki/Voicelines
        const audio = [
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_01.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_01.ogg', 
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_02.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_03.ogg', 
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_04.ogg', 
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_05.ogg', 
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_06.ogg', 
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_07.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_08.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_09.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_10.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_11.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_12.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_13.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_14.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_15.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_16.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Depositing_02nd_Round_17.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Molly_Deposit_Javiere_01.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Molly_Deposit_Javiere_02.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Molly_Deposit_Javiere_03.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Molly_Deposit_Javiere_04.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Molly_Deposit_Javiere_05.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Molly_Deposit_Javiere_06.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Molly_Deposit_Javiere_07.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Molly_Deposit_Javiere_08.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Molly_Deposit_Javiere_10.ogg',
            './Voicelines/MULE/Depositing into the M.U.L.E/Dwarf_Molly_Deposit_Javiere_10a.ogg'
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