const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const { oneLine, stripIndents } = require('common-tags');
const { RichEmbed } = require('discord.js');
const Discord = require('discord.js');
const snoowrap = require('snoowrap');
const config = require("../../config.json");
module.exports = class CompdotaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'compdota',
            group: 'games',
            memberName: 'compdota',
            description: 'Gets the latest info on tournaments',
            examples: ['compdota'],
           
        });
    }
    run(message) {
      const reddit = new snoowrap({
    userAgent: 'put your user-agent string here',
    clientId: config.app_id,
    clientSecret: config.reddit_secret,
    username: 'synysterjoe',
    password: config.password
  });
 

    let redditUser= reddit.getUser('synysterjoe')
    
   
    console.log(redditUser)
    let hot =  reddit.getHot('dota2');
    let array = []
    

  
  }
}