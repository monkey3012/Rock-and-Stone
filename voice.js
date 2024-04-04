const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Fetch a channel by its id
client.channels.fetch('')
  .then(channel => console.log(channel.name))
  .catch(console.error);

const { joinVoiceChannel } = require('@discordjs/voice');

client.login(token);