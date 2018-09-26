const {Command} = require('discord.js-commando');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const { get } = require("snekfetch");
const Mika = require("mika");

module.exports = class DotaCommand extends Command {
    constructor(client) {
    super(client, {
      name: "dota2",
      group: 'fun',
      aliases:['dota'],
      memberName: 'dota2',
      description: 'general dota 2 command.',
      examples: ['dota2'],
      args: [{

            key: 'account_id',
            label: 'account_id',
            prompt: 'Enter your player ID to use my Dota commands!',
            type: 'float',
            infinite: false
          }
          

          ],
      

    });
  }

async run(message, args) { 
 
 
  // Try to get the current user's score. 
  let score = this.client.getScore.get(message.author.id, message.guild.id);

  
  // If the score doesn't exist (new user), initialize with defaults. 
  if (!score.dotaid) {
    score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1, dotaid:args.account_id };
  }

  console.log(score.dotaid);
  console.log(args)
  this.client.setScore.run(score);
 /*
  mika.getPlayer(`${args.account_id}`).then((player) => {
      console.log(`${player.profile.avatarfull}`)
      message.say(`${player.profile.avatarfull}`)
      console.log(`Solo MMR: ${player.solo_competitive_rank}`);
      message.say(`Solo MMR: ${player.solo_competitive_rank}`)
      console.log(`Account ID: ${player.profile.account_id}`);
      message.say(`Account ID: ${player.profile.account_id}`)
      console.log(`Name: ${player.profile.personaname}`);
      message.say(`Name: ${player.profile.personaname}`);
      console.log(`${player.profile.profileurl}`)
      message.say(`${player.profile.profileurl}`)
  }).catch((err) => console.log(err));
   
  mika.getPlayerCounts(`${args}`).then((counts) => {
      let leavers = 0
      for (leaver_stat in counts.leaver_status) {
          if (leaver_stat != "0") {
              leavers += counts.leaver_status[leaver_stat].games;
          }
      }
      console.log(`\nGames with at least one leaver: ${leavers}`)
  }).catch((err) => console.log(err));
  */
    }
}
  
