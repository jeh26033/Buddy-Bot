const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const client = new Discord.Client();


  function scoreChange(message, operation, amount){
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level, dotaid) VALUES (@id, @user, @guild, @points, @level, @dotaid);");

    try{
      console.log('hello from the scoreChange Module!')
      console.log(message.author.id)
      let score =client.getScore.get(message.author.id, message.guild.id);
      console.log(client.getScore);
      console.log(score)
      console.log(amount);
      console.log(operation);
      var curLevel=score.level
      console.log(curLevel)
      var karmicPower = amount;   
      const curPts = score.points;
      console.log(score.karmicPower); 

      if (operation=== '-') {
        score.points -= karmicPower;
       
        client.setScore.run(score)
      }
      if (operation=== '+') {
        score.points += karmicPower;
        
        client.setScore.run(score)
      }
    } catch (e) {
      console.log(e);
    }
  }
module.exports = scoreChange;