const { Command } = require('discord.js-commando');
const { oneLine, stripIndents } = require('common-tags');
const { RichEmbed } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const scoreChange  = require('../../util/scoreChange.js');
const sql = new SQLite('./scores.sqlite');
module.exports = class AdminGivePointsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'admin-give-buddybucks',
            aliases: ['admingive', 'admin-give', 'boss-buck'],
            group: 'games',
            memberName: 'admingive',
            description: 'a command for creating buddybucks for users.',
            examples: [` give your hard earned buddybucks to your buddy!`],
            args: [{

            key: 'user',
            label: 'user',
            prompt: 'What user would you like to give to?',
            type: 'member',
            infinite: false
          },
          {
            key: 'amount',
            label: 'amount',
            prompt: 'What amount would you like to give?',
            type: 'float',
            infinite: false
          }],
          guarded: true,

        });
      }
      hasPermission(msg) {
        if (!this.client.isOwner(msg.author)) return 'You have no power here!';    
        return this.client.isOwner(msg.author);
      }

  run(message, args) {

      client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
      client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level, dotaid) VALUES (@id, @user, @guild, @points, @level, @dotaid);");

     console.log(`${args.user} user`)

      
      let score = client.getScore.get(args.user.id, message.guild.id);
      console.log(client.getScore);
      console.log(score);

      var curLevel=score.level;
      console.log(curLevel);
      var karmicPower = args.amount;
      console.log(karmicPower);
      const curPts = score.points;

    const botlog= client.channels.find('name','bot-logs');
    console.log('lets create inflation!!');
    message.say('lets create inflation!!');
    console.log(`${args.user} user`)


    if (args.amount > 0) {
      Math.floor(score.points += karmicPower); 
      client.setScore.run(score);

    }else{
      Math.floor(score.points = karmicPower); 
      Math.floor(score.level = karmicPower);
      client.setScore.run(score);
    }


   /* let score = this.client.getScore.get(message.author.id, message.guild.id);
    
    // If the score doesn't exist (new user), initialize with defaults. 
    if (!score) {
      score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
    }
    

    // Limited to guild owner - adjust to your own preference!
    //if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");
  
    // Try to get the user from mention. If not found, get the ID given and get a user from that ID. 
    const user = args.user;
    if(!user) return message.reply("You must mention someone or give their ID!");
  
    // Read the amount of points to give to the user. 
    const pointsToAdd = args.amount;
    if(!pointsToAdd) return message.reply("You didn't tell me how many Buddybucks to give...");
  
    // Get their current points. This can't use `score` because it's not the same user ;)
    let userscore = this.client.getScore.get(user.id, message.guild.id);
    
    // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
    if (!userscore) {
      userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 };
    }
    
    // Increment the score. 
    userscore.points += pointsToAdd;
  
    // We also want to update their level (but we won't notify them if it changes)
    let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
    userscore.level = userLevel;
  
    // And we save it!
    this.client.setScore.run(userscore);
    botlog.send(`${pointsToAdd} Buddybucks added to ${user.tag}. You have a balance of ${score.points} buddybucks for a star!`);
    return message.channel.send(`${user.tag} has received ${pointsToAdd} Buddybucks and now stands at ${userscore.points} Buddybucks.`);*/

/*
        const botlog=this.client.channels.find('name','bot-logs');
        if (args.user.id == message.author.id)return message.reply("You can't give yourself points!");
        sql.get(`SELECT * FROM scores WHERE userId ="${args.user.id}"`).then(row => {
            if (row) {
              console.log('giving bucks')
              const curPts = parseInt(row.points, 10);
              const newPts = curPts + args.amount;
              

              sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row =>{

                const authorBal = parseInt(row.points,10);
                const newAuthBal = authorBal - args.amount;
                if(authorBal < args.amount)return message.reply("You can't give more than you have");

              sql.run(`UPDATE scores SET points = ${newAuthBal} WHERE userId = ${message.author.id}`);
                console.log('taking points from giver')

            
              sql.run(`UPDATE scores SET points = ${newPts} WHERE userId = ${args.user.id}`);
                console.log('adding points to getter')
                console.log(curPts);
                console.log(newPts);

              botlog.send(`${args.amount} Buddybucks awarded to ${args.user.user.tag}. They have a balance of ${newPts} buddybucks`);
              message.reply(`Finished. ${args.amount} Buddybucks awarded to ${args.user.user.tag}`);

              })

            } else {
              message.reply(`The user ${args.user.user.tag} doesn't have a scores account! Creating one now...`);
              sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [args.user.id, 0]);
              message.reply('Account created.');
            }
            
          })
            .catch(err => {
              if (err) console.error(`${err} \n${err.stack}`);
              sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
                sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [args.user.id, 0]);
                message.reply('Table did not exist, user inserted into new table.');
              });
            });
    */
  }//end of run
}