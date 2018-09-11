const {Command} = require('discord.js-commando');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const { get } = require("snekfetch");
const abilityEmbed = require("../../embeds/ability");

module.exports = class AbilityCommand extends Command {
    constructor(client) {
    super(client, {
      name: "ability",
      group: 'games',
      memberName: 'ability',
      description: 'Post a randomly selected image of a ability.',
      examples: ['ability'],
      

    });
  }

  async run(message, args, level, loadingMessage) { 
    ability=[]
    
    console.log('ability started')
    (embed(torrent));
  
   
    
  }
}