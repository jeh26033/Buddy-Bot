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
    10.covert kill
     
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
const moment = require('moment');
const Enmap = require("enmap");
const { RichEmbed } = require('discord.js');
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
const sql = require("sqlite");
sql.open("./data/database.sqlite");

var reaction = '⭐';

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

//super cool starboard

client.on('messageReactionAdd', async(reaction, user) => {
    
    if (reaction.emoji.name === '⭐') {
        this.client = client;
        console.log(chalk.yellow(`Found a Star!`));
        const guild = GuildName(reaction.message.guild.name);
        const message = reaction.message;
        //checks if you're staring your own messages.
        //if (message.author.id === user.id) return message.channel.send(`${user}, you cannot star your own messages.`);
        //checks if you're staring a bot message
        if (message.author.bot) return message.channel.send(`${user}, you cannot star bot messages.`);
        const starChannel = message.guild.channels.find('name','starboard');

        // If there's no starboard channel, we stop the event from running any further, and tell them that they don't have a starboard channel.
        if (!starChannel) return message.channel.send(`It appears that you do not have a \`${starboard}\` channel.`); 

        console.log('searching if a message like this is already there');
        const fetch = await starChannel.fetchMessages({ limit: 100 }); 
        const stars = fetch.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id)); 
        

        if (stars) {
            
            // Regex to check how many stars the embed has.
            const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);

            // A variable that allows us to use the color of the pre-existing embed.
            const foundStar = stars.embeds[0];

            // We use the this.extension function to see if there is anything attached to the message.
            const image =  message.attachments.size > 0 ? message.attachments.array()[0].url : ''; 
            
            const embed = new RichEmbed()
                .setColor(foundStar.color)
                .setDescription(foundStar.description)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setTimestamp()
                .setFooter(`⭐ ${parseInt(star[1])+1} | ${message.id}`)
                .setImage(image);
                // We fetch the ID of the message already on the starboard.
                const starMsg = await starChannel.fetchMessage(stars.id);
                // And now we edit the message with the new embed!
                await starMsg.edit({ embed }); 
               
        }

        // Now we use an if statement for if a message isn't found in the starboard for the message.
        if (!stars) {
        console.log('A new Star message!');

          // We use the this.extension function to see if there is anything attached to the message.
          
          const image =  message.attachments.size > 0 ? message.attachments.array()[0].url : ''; 
          // If the message is empty, we don't allow the user to star the message.
          if (image === '' && message.cleanContent.length < 1) return message.channel.send(`${user}, you cannot star an empty message.`); 
          message.channel.send('The message has been added to the Starchannel!');
          message.author.send('you had a post starred!');
          const embed = new RichEmbed()
            // We set the color to a nice yellow here.
            .setColor(15844367)
            // Here we use cleanContent, which replaces all mentions in the message with their
            // equivalent text. For example, an @everyone ping will just display as @everyone, without tagging you!
            // At the date of this edit (09/06/18) embeds do not mention yet.
            // But nothing is stopping Discord from enabling mentions from embeds in a future update.
            .setDescription(message.cleanContent) 
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp(new Date())
            .setFooter(`⭐ 1 | ${message.id}`)
            .setImage(image);
          await starChannel.send({ embed });
        }

    }
    client.on('messageReactionRemove', async(reaction, user) => {
        this.client = client;
        
        const message = reaction.message;
        //if (message.author.id === user.id) return;
        
        if (reaction.emoji.name !== '⭐') return;
        
        const starChannel = message.guild.channels.find('name','starboard');
        const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
        
        const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(reaction.message.id));
        
        if (stars) {
             
          const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
          const foundStar = stars.embeds[0];
          const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : '';
          
          const embed = new RichEmbed()
            .setColor(foundStar.color)
            .setDescription(foundStar.description)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter(`⭐ ${parseInt(star[1])-1} | ${message.id}`)
            .setImage(image);
          const starMsg = await starChannel.fetchMessage(stars.id);
          await starMsg.edit({ embed });
          console.log(chalk.red('removed a star'));
          if(parseInt(star[1]) - 1 == 0) return starMsg.delete(1000);
          console.log(chalk.red('removed a post'));
        }
    });

});



client.on('message', msg => {
    if (msg.author.bot) return; // Ignore bots.
    if (msg.channel.type === "dm") return; // Ignore DM channels.
    if (msg.content === '!h') {
         msg.channel.fetchMessages({limit: 100}).then(messages => message.channel.bulkDelete(messages));
    }
});



function GuildName(guild) {
    return "Guild" + guild.replace(/[^a-zA-Z ]/g, "");
}

function writeLeaderboards() {
    const starboard = reaction.message.guild.channels.find('name', 'hall-of-fame');
    var embed = new Discord.RichEmbed()
        .setAuthor(`Hall of fame nomination with ${starCount} stars`)
        .addField(`Author:`, reaction.message.author.username)
        .addField('Message:', reaction.message.content)
        .setImage(reaction.message.author.avatarURL)
        .setFooter('Upvote this message using the ⭐ emoji!')
    starboard.send({embed});
}


client.login(config.token);