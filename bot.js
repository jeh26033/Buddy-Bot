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
    11. remove DMing from getting starred. 
    12. make more messages remove themselves, including leaderboards.
 */
const morse = require('morse-node').create('ITU');
const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const path = require('path');
const commando = require('discord.js-commando');
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
const EnmapLevel = require('enmap-level');
const { RichEmbed } = require('discord.js');

//heroku ports and such.
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const commandprefix ='!';
// client set up and settings
const client = new commando.Client({
    commandPrefix: 'buddy, ',
    owner: [
        '162215263335350272', //joe
        '93420059858305024', //Arbiter
        '198885740376096768' //Forge
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

//reaction for starboard
var reaction = '⭐';

//error message managment 
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

const activities_list = [
    "Spamming Tinker",
    "listening to Flyleaf", 
    "listening to Mudvayne", 
    "I'm watching you Fushi.",
    "Human Domination Sim",
    "The Brave Little Toaster",
    "listening to Godsmack"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

//logging
client.on("ready", () => {
  console.log(chalk.magenta(`Logged in as ${client.user.tag}!`));
  //client.user.setActivity("with my food!");
  console.log(chalk.green('I am ready!'));
  // Check if the table "points" exists.
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, dotaid INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
    // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level, dotaid) VALUES (@id, @user, @guild, @points, @level, @dotaid);");
});

//check to see if a person is in the table after every message is sent.
client.on("message", message => {
  const botwords = ["robot", "ultron", "robots", "bot "];
  if(botwords.some(word => message.content.includes(word)) ) {
    if (message.author.bot) return;
      //message.split(/\b/).some(word => botwords.includes(word));
     message.react("🤖")
    // Or just do message.delete();
  }
  const botlog=client.channels.find('name','bot-logs');
  let score;
  if (message.guild) {
    // Try to get the current user's score. 
    score = client.getScore.get(message.author.id, message.guild.id);
    
    // If the score doesn't exist (new user), initialize with defaults. 
    if (!score) {
      //ensure buddy can't get points
      if (message.author.bot)return
      score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1, dotaid:null };
    }
    if (message.author.bot){
      return
      }else{
    score.points++;
  }
    // Increment points.
    
    // Calculate the current level through MATH OMG HALP.
    let curLevel = Math.floor(0.1 * Math.sqrt(score.points+1));
    
    
    // Check if the user has leveled up, and let them know if they have:
    if(score.level < curLevel) {
      score.level = curLevel;
      // Level up!
      if(curLevel < 5){
        message.channel.send({embed: {
          color: 3447003,
          description: `:sparkles: :up: You've leveled up to level **${curLevel}**! Still a wee baby! :up: :sparkles: `
          }})
        .then(msg => {
          msg.delete(10000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      }

      if (curLevel >5 ) {
        message.channel.send({embed: {
          color: 3447003,
          description: `:sparkles: :up: You've leveled up to level **${curLevel}**! You're growing up so fast!! :up: :sparkles: `
          }})
        .then(msg => {
          msg.delete(10000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      }
       
      if (curLevel >10) {
        message.channel.send({embed: {
          color: 3447003,
          description: `:sparkles: :up: You've leveled up to level **${curLevel}**! WOW, now you're just showing off :up: :sparkles: `
          }})
        .then(msg => {
          msg.delete(10000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      }

    }
    // Save data to the sqlite table. 
    client.setScore.run(score);
  }
});//message


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
//sends command run to bot-log as well
client.on('commandRun', (command, promise, msg) => {
    if (msg.guild) {
       const botlog=client.channels.find('name','bot-logs');
        botlog.send({embed: {
            color: 3447003,
            description: `
            **Command ran**
        Guild: ${msg.guild.name} (${msg.guild.id})
        Channel: ${msg.channel.name} (${msg.channel.id})
        User: ${msg.author.tag} (${msg.author.id})
        Command: ${command.groupID}:${command.memberName}
        Message: "${msg.content}"
            `
        }});
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

//super cool Reactions!

client.on('messageReactionAdd', async(reaction, user) => {

let message = reaction.message;
let score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
var curLevel=score.level
var karmicPower = 20;       
    //karma
    const botlog= client.channels.find('name','bot-logs');
    if (reaction.emoji.name === '⬆') {
    console.log(chalk.blue(`Found an ups!`));
    //checks if you're staring your own messages.
    if (message.author.id === user.id) return message.channel.send({embed: {
          color: 3447003,
          description:`${user}, you cannot ups your own messages.`
          }})
        .then(msg => {
          msg.delete(3000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      
    //checks if you're staring a bot message
    if (message.author.bot) return
          

    score = client.getScore.get(message.author.id, message.guild.id);
        let curLevel=score.level
       
        // If the score doesn't exist (new user), initialize with defaults. 
        if (!score) {
       
        }
        const curPts = score.points;
        console.log(score.karmicPower);
        score.points += karmicPower;
        botlog.send(`${karmicPower} Buddybucks added to ${message.author.tag}. You have a balance of ${score.points} buddybucks for ups`);
        client.setScore.run(score)
        
    }//end of add karma

    if (reaction.emoji.name === '⬇') {
    console.log(chalk.blue(`Found an downs`));
    //checks if you're staring your own messages.
    if (message.author.id === user.id) return message.channel.send({embed: {
          color: 3447003,
          description:`${user}, you cannot down your own messages.`
          }})
        .then(msg => {
          msg.delete(3000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      }
      

    //checks if you're staring a bot message
    if (message.author.bot) return
     
     score = client.getScore.get(message.author.id, message.guild.id);

          // If the score doesn't exist (new user), initialize with defaults. 
          if (!score) {
            score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
          }
          const curPts = score.points;
          score.points -= karmicPower;
          botlog.send(`${karmicPower} Buddybucks removed from ${message.author.tag}. You have a balance of ${score.points}`);
          client.setScore.run(score)

    //end of remove karma
    if (reaction.emoji.name === '⭐') {
        
        this.client = client;
        console.log(chalk.yellow(`Found a Star!`));
        const guild = GuildName(reaction.message.guild.name);
        const message = reaction.message;
        //checks if you're staring your own messages.
        if (message.author.id === user.id) return message.channel.send({embed: {
          color: 3447003,
          description:`${user}, you cannot star your own messages.`
          }})
        .then(msg => {
          msg.delete(3000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
        //checks if you're staring a bot message
       // if (message.author.bot) return message.channel.send(`${user}, you cannot star bot messages.`);
        const starChannel = message.guild.channels.find('name','star-channel');

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
          const curPts = score.points;
          if (!score) {
            score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
          }
        score.points += 100;
        botlog.send(`100 Buddybucks added to ${message.author.tag}. You have a balance of ${score.points} buddybucks for a star!`);
        this.client.setScore.run(score);
          
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
      const image =  message.attachments.size > 0 ? message.attachments.array()[0].url : ''; 
      // If the message is empty, we don't allow the user to star the message.
      if (image === '' && message.cleanContent.length < 1) return message.channel.send(`${user}, you cannot star an empty message.`); 

      message.channel.send({embed: {
            color: 3447003,
            description: `:sparkles: :star: A star has been born! :star: :sparkles: `
          }})
        .then(msg => {
          msg.delete(10000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      //star alert!
      message.author.send('you had a post starred!');

      // gives user 100 buddybucks
      score = client.getScore.get(message.author.id, message.guild.id);

      // If the score doesn't exist (new user), initialize with defaults. 
      if (!score) {
        score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
      }
      score.points += 100;
      botlog.send(`100 Buddybucks added to ${message.author.tag}. You have a balance of ${score.points} buddybucks for a star!`);
      this.client.setScore.run(score);
      const embed = new RichEmbed()
        // We set the color to a nice yellow here.
        .setColor(15844367)
        .setDescription(message.cleanContent) 
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp(new Date())
        .setFooter(`⭐ 1 | ${message.id}`)
        .setImage(image);
      await starChannel.send({ embed });
    }
  }
});

//reaction removed

client.on('messageReactionRemove', async(reaction, user) => {
    let score;
    let message = reaction.message;
    //karma
    const botlog= client.channels.find('name','bot-logs');

    score = client.getScore.get(message.author.id, message.guild.id);
      // If the score doesn't exist (new user), initialize with defaults. 
      if (!score) {
        score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1,dotaid:null };
      }
      const curPts = score.points;
      console.log(score.points);
      score.points -= 20;
      client.setScore.run(score)
        
    //end of add karma

    if (reaction.emoji.name === '⬇') {
    console.log(chalk.blue(`Found an downs`));
    //checks if you're karma'ing your own messages.
    if (message.author.id === user.id) return message.channel.send(`${user}, you cannot ⬇ your own messages.`);
    //checks if you're karma'ing a bot message
    if (message.author.bot) return message.channel.send(`${user}, you cannot ⬇ bot messages.`);
     
    score = client.getScore.get(message.author.id, message.guild.id);
      // If the score doesn't exist (new user), initialize with defaults. 
      if (!score) {
        score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
      }
      const curPts = score.points;
      console.log(score.points);

      score.points += 20;
      client.setScore.run(score)

    }//end of remove karma

    this.client = client;
    //if (message.author.id === user.id) return;
    //ignores if the reaction isn't a star
    if (reaction.emoji.name !== '⭐') return;
    //finds and names the starboard channel

    const starChannel = message.guild.channels.find('name','star-channel');
    const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
    //searches message
    const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(reaction.message.id)); 
    if (stars) { 
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
      const foundStar = stars.embeds[0];
      const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : '';
      score = client.getScore.get(message.author.id, message.guild.id);
      //user removes a star
      // If the score doesn't exist (new user), initialize with defaults. 
      if (!score) {
        score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
      }
      const curPts = score.points;
      score.points -= 100;
      this.client.setScore.run(score)
      //end of score keeping
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

function GuildName(guild) {
    return "Guild" + guild.replace(/[^a-zA-Z ]/g, "");
}


process.on('unhandledRejection', err => {
  console.error(`"error": \n${err.stack}`);
});


client.login(config.token);

function resetBot(channel, msg) {
// send channel a message that you're resetting bot [optional]
    console.log('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(config.token));
}
//dumb admin commands

client.on('message',message=>{
  const adminPrefix=['?','%','/'];
  let prefix = false;
  for(const thisPrefix of adminPrefix) {
    if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
  }
  if(!prefix) return;

  if(message.content.startsWith(prefix+'restart')){
    resetBot(message.channel);
  }

})

// set message listener 
client.on('message', message => {
    switch(message.content.toUpperCase()) {
        case '?RESET':
            resetBot(message.channel);
            break;

        // ... other commands
    }
});

// Turn bot off (destroy), then turn it back on
async function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Resetting...')
    await channel.send("Rebooting...").catch(err => this.client.console.error(err));
    process.exit(1);
    client.login(config.token);
    channel.send('I\'m back');
    console.log('look at me')
}