const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const client = new Discord.Client();

module.exports =
  function scoreChange(message, operation, amount){
    try{
      console.log('hello from the scoreChange Module!')
      console.log(message.author.id)
      console.log(client.getScore);
      let score = client.getScore.get(message.author.id, message.guild.id);
      console.log(score)
      const botlog= client.channels.find('name','bot-logs');
      console.log(score);
      console.log(amount);
      console.log(operation);
      var curLevel=score.level
      console.log(curLevel)
      var karmicPower = amount;   
      const curPts = score.points;
      console.log(score.karmicPower); 

      if (operation=== '-') {
        score.points -= karmicPower;
        botlog.send(`${karmicPower} Buddybucks removed from ${message.author.tag}. You have a balance of ${score.points} buddybucks for ups`);
        client.setScore.run(score)
      }
      if (operation=== '+') {
        score.points += karmicPower;
        botlog.send(`${karmicPower} Buddybucks added to ${message.author.tag}. You have a balance of ${score.points} buddybucks for ups`);
        client.setScore.run(score)
      }
    } catch (e) {
      console.log(e);
    }
  }
