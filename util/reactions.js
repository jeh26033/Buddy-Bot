const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const scoreChange  = require('./scoreChange.js');
const client = new Discord.Client();
const editJsonFile = require("edit-json-file");
const chalk = require('chalk');

function reactions(reactionName, user, message){
  try{

    console.log('hello from the reactions Module!');
    
    

  //  let guildName = `settings/settings_${this.client.guild.id}`
    //let file = editJsonFile(`${guildName}.json`);
    //karma
    console.log(reactionName);
    if (reactionName === '⬆'&& !user.bot) {
      console.log(chalk.blue(`ups!`));
      scoreChange(message, '+',20); 
    }
    //end of add karma

    //remove karma
    if (reactionName === '⬇'&& !user.bot) {
      if (message.author.id === user.id) {
        reaction.remove(user).then(reaction => {
          console.log('Removed a reaction.');
        });
      }
      if (message.author.id === user.id) return message.channel.send({embed: {
        color: 0x8a2be2,
        description:`${user}, knock it off.`
      }})
    .then(msg => {
      msg.delete(3000)
      })
    .catch();
      console.log(chalk.blue(`Found an downs`));
    scoreChange(message, '-', 20); 
  }
  //end of remove karma
    } catch (e) {
      console.log(e);
    }
  }
module.exports = reactions;

