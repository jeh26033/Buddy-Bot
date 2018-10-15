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

  async run(message, args, level) { 
    scoreChange(message,"-",10)
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