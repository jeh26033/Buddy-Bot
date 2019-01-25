const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const scoreChange  = require('./util/scoreChange.js');
const client = new Discord.Client();

  function reactions(message, operation, amount){
    try{
      console.log('hello from the reactions Module!');
      let score =client.getScore.get(message.author.id, message.guild.id);
      console.log(client.getScore);
      console.log(score);
      console.log(amount);
      console.log(operation);
      var curLevel=score.level;
      console.log(curLevel);
      var karmicPower = amount/curLevel;
      console.log(karmicPower);
      const curPts = score.points;
      if (operation=== '-') {
        score.points -= karmicPower;
        client.setScore.run(score);
      }
      if (operation=== '+') {
        score.points += karmicPower;
        client.setScore.run(score);
      }
    } catch (e) {
      console.log(e);
    }
  }
module.exports = reaction;