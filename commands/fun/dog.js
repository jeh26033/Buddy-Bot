const {Command} = require('discord.js-commando');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const { get } = require("snekfetch");

module.exports = class DogCommand extends Command {
    constructor(client) {
    super(client, {
      name: "dog",
      group: 'fun',
      aliases:['dawg','doggy','fren','goodboy'],
      memberName: 'dog',
      description: 'Post a randomly selected image of a dog.',
      examples: ['dog'],
      

    });
  }

  async run(message, args, level, loadingMessage) { 
    const botlog=this.client.channels.find('name','bot-logs');
    let score = this.client.getScore.get(message.author.id, message.guild.id);
    if (!score) {
      score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
    }
    if (score.points < 10)return message.reply("Need some more coin fren, 10 should do")
    if (score){
        const curPts = score.points;
        score.points -= 10;
        this.client.setScore.run(score);
        botlog.send(`10 Buddybucks removed from ${message.author.tag}.  ${score.points} buddybucks remain.`);
     loadingMessage= ":keyboard: Buddy is meeting a new fren..."
    message.say(loadingMessage);
    const { body } = await get(args[0] ? `https://dog.ceo/api/breed/${args[0]}/images/random` : "https://dog.ceo/api/breeds/image/random");
    return message.say({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": body.message,
        "color": 6192321,
        "image": {
          "url": body.message
        }
      }
    });
   }
  }
}