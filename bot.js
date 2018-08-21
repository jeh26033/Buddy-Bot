/*TO-DO
    
    1. Steam integrations
    2. Dota/patch release ping
    3. Settings
    4. 'buddy, what's up? command
    5. content filtering
    6. starboard
    7. TI/twitch scheduleing.
    8. inhouse organizer
    9. VODs by team name

     
 */

const Discord = require('discord.js');
const sqlite = require('sqlite');
const path = require('path');
const commando = require('discord.js-commando');
const { Command } = require('discord.js-commando');
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const error = chalk.bold.red;
const warn = chalk.keyword('orange');
const debug = chalk.cyan;
const dbots = require('superagent');
const config = require("./config.json");

//heroku ports and such.
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

// client set up and settings
const client = new commando.Client({
    commandPrefix: '!',
    owner: [
        '162215263335350272' //joe
    ],
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['basic', 'Our First Command Group'],
        ['fun', 'Commands for fun!'],
        ['games','Commands for Dota and other game integrations'],
        ['general', 'Commands for general use'],
        ['moderator', 'Commands for moderator functions'],
        ['role', 'Commands that effect roles']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));


console.log(chalk.green('Commando set up.'));
console.log('Awaiting log in.');


client
    .on('error', e => console.error(error(e)))
    .on('warn', e => console.warn(warn(e)))
    .on('debug', e => console.log(debug(e)))
    .on('ready', () => {

    })
    .on('disconnect', () => console.warn('Disconnected!'))
    .on('reconnecting', () => console.warn('Reconnecting...'))
    .on('commandError', (cmd, err) => {
        if (err instanceof commando.FriendlyError) return;
        console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
    })
    .on('commandBlocked', (msg, reason) => {
        console.log(oneLine `
            Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
            blocked; ${reason}
        `);
    })
//settings and blacklist. Needs more work.
sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
    client.setProvider(new SQLiteProvider(db));
});
/*
client.dispatcher.addInhibitor(msg => {
  const blacklist = require('./bin/blacklist.json');
  if (blacklist.guilds.includes(msg.guild.id)) return [`Guild ${msg.guild.id} is blacklisted`, msg.channel.send('This guild has been blacklisted. Appeal here: https://discord.gg/6P6MNAU')];
});
client.dispatcher.addInhibitor(msg => {
  const blacklist = require('./bin/blacklist.json');
  if (blacklist.users.includes(msg.author.id)) return [`User ${msg.author.id} is blacklisted`, msg.reply('You have been blacklisted. Appeal here: https://discord.gg/6P6MNAU')];
});

*/ // needs more work ^^

client.on('ready', () => {
    console.log(chalk.magenta(`Logged in as ${client.user.tag}!`));
    client.user.setActivity("with my code");
    console.log(chalk.green('I am ready!'));
});

//debug messages
client.on('commandBlocked', (msg, reason) => {
    console.log(oneLine `
            Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
            blocked; ${reason}
        `);
})
client.on('commandStatusChange', (guild, command, enabled) => {
    console.log(oneLine `
            Command ${command.groupID}:${command.memberName}
            ${enabled ? 'enabled' : 'disabled'}
            ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
        `);
})
client.on('commandRun', (command, promise, msg) => {
    if (msg.guild) {
        console.log(`Command ran
        Guild: ${msg.guild.name} (${msg.guild.id})
        Channel: ${msg.channel.name} (${msg.channel.id})
        User: ${msg.author.tag} (${msg.author.id})
        Command: ${command.groupID}:${command.memberName}
        Message: "${msg.content}"`);
    } else {
        console.log(`Command ran:
        Guild: DM
        Channel: N/A
        User: ${msg.author.tag} (${msg.author.id})
        Command: ${command.groupID}:${command.memberName}
        Message: "${msg.content}"`);
    }
})
client.login(config.token);