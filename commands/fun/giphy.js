const {Command} = require('discord.js-commando');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const { get } = require("snekfetch");
var GphApiClient = require('giphy-js-sdk-core');
client = GphApiClient("BDGsFcBYnSAr2tySHx8zsBkMRVdaTLTj");
module.exports = class GifCommand extends Command {
    constructor(client) {
    super(client, {
      name: "gif",
      group: 'fun',
      memberName: 'gif',
      description: 'Post a reaction giph!',
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

    
    async run(message, args, level) { 
	/// Gif Search
	 	let tag = args.tag;
		client.search('gifs', {"q": `${tag}`,"limit":"1"})
		  .then((response) => {
		    response.data.forEach((gifObject) => {
		     	
		      console.log(gifObject.url);
		      message.say(gifObject.url);
		    })
		  })
		  .catch((err) => {
		  	message.say('not sure what happened there');
		  })

	

	}  	
}

