

const {Command} = require('discord.js-commando');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const { get } = require("snekfetch");

module.exports = class GifCommand extends Command {
    constructor(client) {
    super(client, {
      name: "gif",
      group: 'fun',
      aliases:['gif-me-up','jif-me-up'],
      memberName: 'gif',
      description: 'Post a reaction gif!',
      examples: ['gif me up!'],
      args: [{

            key: 'tag',
            label: 'tag',
            prompt: 'What gif would you like ?',
            type: 'string',
            infinite: false
          }]
    });
  }

    
    async run(message, args, level) { // eslint-disable-line no-unused-vars     
     try{
      let tag = args.tag;
      const giflist = await get(`http://replygif.net/api/gifs?tag=${tag}&api-key=39YAprx5Yi`);
      if (giflist.body.file === 'undefined')return message.say('cant find that tag');
      let id=Math.floor((Math.random() * 100) + 1);
      let chosenOne= giflist.body[id]
      let chosenGif=chosenOne.file
      message.channel.send({
        "embed": {
          "image": {
            "title": chosenGif,
            "url": chosenGif
          }
          
        }
      });
    }
    catch(e){
      console.error(e);
      message.say('cant find that, try something else')
    }
    }
}



