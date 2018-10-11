const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const {Command} = require('discord.js-commando');

module.exports = 

  function scoreChange(message, operation, amount){
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
  }
