const {Command} = require('discord.js-commando');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const { get } = require("snekfetch");

module.exports = class BirdCommand extends Command {
    constructor(client) {
    super(client, {
      name: "bird",
      group: 'fun',
      aliases:['birb'],
      memberName: 'bird',
      description: 'Post a randomly selected image of a bird.',
      examples: ['bird'],
      

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
    loadingMessage= ":keyboard: Buddy is petting a bird..."
    message.say(loadingMessage);
    const { body } = await get("http://random.birb.pw/tweet/");
    return message.say({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": `https://random.birb.pw/img/${body}`,
        "color": 6192321,
        "image": {
          "url": `https://random.birb.pw/img/${body}`
          }
        }
      });
    }
  }
}