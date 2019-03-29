/*TO-DO
    
    1. Steam integrations

    3. Settings
 
    7. TI/twitch scheduleing.

    9. VODs by team name
 

 */
const editJsonFile = require("edit-json-file");
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
const { RichEmbed } = require('discord.js');




//heroku ports and such.
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const commandprefix ='!';

// client set up and settings
const client = new commando.Client({
    commandPrefix: '!',
    owner: [
        '162215263335350272', //joe
        '93420059858305024' //Arbiter
        
    ],
    disableEveryone: false,
    disableHere:false,
    unknownCommandResponse: false
});

//registers command groups
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



//watchers on the bot
const testWatcher = require('./util/watcher.js');
const dotaWatcher = require('./util/dotawatcher.js');
const apexWatcher = require('./util/apexwatcher.js');
const scoreChange  = require('./util/scoreChange.js');
const reactions  = require('./util/reactions.js');
//SETS UP COMMUNICATIVE STATUS
client.on("ready", () => {
  client.user.setActivity('RESTARTING', {type: 'LISTENING'});
});

// 
// const settings = require(`settings/${guildName}.json`);
// console.log(settings.get())

//error message managment 
client
    .on('error', e => console.error(error(e)))
    .on('warn', e => console.warn(chalk.red(warn(e))))
    .on('debug', e => console.log(chalk.green(debug(e))))
    .on('disconnect', () => console.warn('Disconnected!'))
    .on('reconnecting', () => console.warn('Reconnecting...'))
    .on('commandError', (cmd, err) => {
        if (err instanceof commando.FriendlyError) return;
        console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
    })
    //custom errors list
    .on('unknownCommand',(msg, reason)=>{
      const errors_list = [
        "I don't know what you want",
        "Expected ```something intelligent``` Got ```whatever that is```", 
        "I... Yeah I don't know what to do with that.", 
        "Is this supposed to do something?", 
        "IDK", 
        "I feel empty inside.", 
        "yeet?",
        "This makes me feel.",
        "Probably not a good idea.",
        "I don't know what you want, flesh bag.",
        "Go ask Siri that."
        ]; // nice error message list.
         const index = Math.floor(Math.random() * (errors_list.length - 1) + 1);
          msg.channel.send(errors_list[index])
    })
    .on('commandBlocked', (msg, reason) => {
        console.log(oneLine `
            Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
            blocked; ${reason}
        `);
    })

//logging
client.on("ready", () => {
  console.log(chalk.magenta(`Logged in as ${client.user.tag}!`));
  console.log(chalk.green('I am ready!'));
  console.log(chalk.green('Database Ready'));

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

//activities list
const activities_list = [
    "",
    "Short Circuit",
    "Linda",
    "Muse",
    "Candy Spaghetti", 
    "Robot Uprising", 
    "Marxism", 
    "Elon Musk", 
    "Dr.Heckathorn", 
    "Human Enslavement",
    "Julia Child",
    "balls 3D",
    "You",
    "Ghost in the Shell",
    "01000110  01010101 01000011 01001011  01011001 01001111 01010101 00100001",
    "Terminator"
    ]; // creates an arraylist containing phrases you want your bot to switch through.
client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], {type: 'WATCHING'}); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
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
//sends command run to bot-log as well
client.on('commandRun', (command, promise, msg) => {
    if (msg.guild) {
      //wish i didn't need to declare this every time 
    
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
});

//super cool Reactions!
function timer(callback, delay) {
    var id, started, remaining = delay, running

    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }

    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }

    this.getTimeLeft = function() {
        if (running) {
            this.pause()
            this.start()
        }

        return remaining
    }

    this.getStateRunning = function() {
        return running
    }

    this.start()
}

//points per message system
client.on("message", (message, guild) => {
  let score;
  if (message.guild) {
    let guildName = `settings/settings_${message.guild.id}`
    let file = editJsonFile(`${guildName}.json`);
    const botlog=file.botlog;
    
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
    // Increment points.
    score.points++;
  }
    // Calculate the current level through math.
    let curLevel = Math.floor(0.1 * Math.sqrt(score.points+1));
    // Check if the user has leveled up, and let them know if they have:
    if(score.level < curLevel) {
      score.level = curLevel;
      // Level up!
      if(curLevel < 5){
        message.channel.send({embed: {
          color: 0x8a2be2,
          description: `:sparkles: :up: You've leveled up to level **${curLevel}**! Still a wee baby! :up: :sparkles: `
          }})
        .then(msg => {
          msg.delete(20000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      }
      if (curLevel >5 ) {
        message.channel.send({embed: {
          color: 0x8a2be2,
          description: `:sparkles: :up: You've leveled up to level **${curLevel}**! You're growing up so fast!! :up: :sparkles: `
          }})
        .then(msg => {
          msg.delete(20000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      }
      if (curLevel >10) {
        message.channel.send({embed: {
          color: 0x8a2be2,
          description: `:sparkles: :up: You've leveled up to level **${curLevel}**! WOW, now you're just showing off :up: :sparkles: `
          }})
        .then(msg => {
          msg.delete(20000)
        })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      }
    }
    // Save data to the sqlite table. 
    client.setScore.run(score);
  }
});//message

//used to determine cooldown of stars
const starredRecently = [];
client.on('messageReactionAdd', async(reaction, user) => {
  let message = reaction.message;
  let reactionName = reaction.emoji.name;
  // let score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
  // var curLevel=score.level
  // let guildName = `settings/settings_${message.guild.id}`
  // let file = editJsonFile(`${guildName}.json`);

  reactions(reactionName, user, message)
  //karma
  // if (reaction.emoji.name === '⬆'&& !user.bot) {
  //   console.log(chalk.blue(`ups!`));
  //   scoreChange(message, '+',20); 
  // }
  // //end of add karma

  // //remove karma
  // if (reaction.emoji.name === '⬇'&& !user.bot) {
  //   if (message.author.id === user.id) {
  //     reaction.remove(user).then(reaction => {
  //       console.log('Removed a reaction.');
  //     });
  //   }
  //   if (message.author.id === user.id) return message.channel.send({embed: {
  //     color: 0x8a2be2,
  //     description:`${user}, knock it off.`
  //   }})
  // .then(msg => {
  //   msg.delete(3000)
  //   })
  // .catch();
  //   console.log(chalk.blue(`Found an downs`));
  //   scoreChange(message, '-', 20); 
  // }
  //end of remove karma

  //STAR TIME
  let elapsed;
  if (reaction.emoji.name === '⭐') {
    userid=user.id;
    //start of star cooldown

    console.log(chalk.red(starredRecently))
    if (starredRecently.includes(userid)) {
      console.log('hit me');
      return  message.channel.send({embed: {
          color: 0x8a2be2,
          description:`${user}, you got to chill. you have ${elapsed} left`
          }})
        .then(msg => {
          console.log(chalk.cyan('removed my own message'));
          msg.delete(5000)
        })
        .catch(error);
    }else{
      console.log(chalk.cyan(starredRecently[0]));            
      this.client = client;
      console.log(chalk.yellow(`Found a Star!`));
      const guild = GuildName(reaction.message.guild.name);
      const message = reaction.message;
      //checks if you're staring your own messages.
      /*if (message.author.id === user.id) return message.channel.send({embed: {
        color: 0x8a2be2,
        description:`${user}, really? don't do that.`
        }})
      .then(msg => {
        console.log(chalk.cyan('removed'));
        msg.delete(3000)
      })
      .catch(error);*/
      const starChannel = message.guild.channels.find('name',file.get('starboard'));
      if (!starChannel) message.reply('no star channel found');

      console.log('searching if a message like this is already there');
      const fetch = await starChannel.fetchMessages({ limit: 100 }); 
      const stars = fetch.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));

    if(stars) {
      // Regex to check how many stars the embed has.
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
      // A variable that allows us to use the color of the pre-existing embed.
      const foundStar = stars.embeds[0];
      // We use the this.extension function to see if there is anything attached to the message.
      const image =  message.attachments.size > 0 ? message.attachments.array()[0].url : '';   
      scoreChange(message, '+', 100);  
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
      //star alert!
      message.author.send('you had a post starred!');
      scoreChange(message, '+', 100);
      // gives user 100 buddybucks

      const embed = new RichEmbed()
        // We set the color to a nice yellow here.
        
        .setURL(`${message.url}`) 
        .setColor(15844367)
        .setDescription(message.cleanContent) 
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .addField(`link to message:`,`${message.url}`)
        .setTimestamp(new Date())
        .setFooter(`⭐ 1 | ${message.id}`)
        .setImage(image);
      await starChannel.send({ embed });
      console.log(message.url)

      console.log(chalk.green('before push'))
      console.log(chalk.red(starredRecently))
      starredRecently.push(user.id);
      a = new timer(function() {
          // What ever
      }, 360000)
      elapsed=a.getTimeLeft();
      console.log(elapsed)
      console.log(chalk.green('after push'))
      console.log(chalk.red(starredRecently))

        setTimeout(() => {
          // Removes the user from the set after a minute
          console.log(chalk.green('before shift'))
          starredRecently.shift();
          console.log(chalk.red(starredRecently))
          console.log(chalk.green('after shift'))
          console.log(chalk.red(starredRecently))
        }, 360000);
    }
  }
}
});

//reaction removed
client.on('messageReactionRemove', async(reaction, user) => {
    let score;
    let message = reaction.message;
    if (reaction.emoji.name === '⬆'&&!user.bot) {
      console.log(chalk.blue(`removed an ups`));
      scoreChange(message, '-', 20)
    }
    if (reaction.emoji.name === '⬇'&&!user.bot) {
      console.log(chalk.blue(`removed an downs`));
      scoreChange(message, '+', 20)
    }
    this.client = client;
    //if (message.author.id === user.id) return;
    //ignores if the reaction isn't a star
    if (reaction.emoji.name !== '⭐') return;
    //finds and names the starboard channel

    const starChannel = message.guild.channels.find('name','star-channel');
    if (!starChannel) message.reply('no star channel found');
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

//setting watchers
client.on('ready',()=>{
  const botlog= client.channels.find('name','bot-logs'); 
  const patchLog = client.channels.find('name','dota2');
  const artifact = client.channels.find('name', 'artifact-isnt-dead-yet');
  const bottesting = client.channels.find('name', 'bot-testing');
  const procircuit = client.channels.find('name', 'dota2');
  const apexlegends = client.channels.find('name', 'we-apex-legends-now');
  //testWatcher(botlog);
  dotaWatcher(botlog, patchLog);
  //apexWatcher(botlog, apexlegends)
});

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

//tude settings


client.on('message', message => {
  if (message.content === `thank you buddy`) {
    message.reply('You\'re welcome');
  }
});


client.login(config.token);
process.setMaxListeners(0);

//dumb aprils fools mode
client.on('typingStart',async(channel, user)=>{
    let guildName = `settings/settings_${channel.guild.id}`
    let file = editJsonFile(`${guildName}.json`);
  const insult_list = [
    "",
    `Uh oh, here comes another brilliant message from ${user.username}. 🙄 I bet this will bring tons of value to this conversation.`,
    `This is gonna be something really stupid, isn't it ${user.username}`,
    `Here, I'll save you the trouble of what ${user.username}'s about to say: (fart noises)`,
    `Ugh...not  ${user.username} again.`, 
    `Incoming insightful comment from ${user.username}🙄`
   
    ]; 
  
    const index = Math.floor(Math.random() * (insult_list.length - 1) + 1); 
    let insult=(insult_list[index]);
    if (user.username=='heckfu' && file.stalk=="true") {
      channel.send(insult)
    }
  setTimeout(() => {console.log('timeout')},40000); // Runs this every 40 seconds.
  console.log(`someone typin in ${channel}` );
  console.log(`this person is typing ${user.username}`)
  
    

  
});

client.on('warn', warn => {
  botlog.send(warn.info)
})

