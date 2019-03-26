const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
//const sql = require("sqlite");
//const db = sql.open("./score.sqlite"); 
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
module.exports = class LeaderboardCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            aliases: ['leaderboards','best','top'],
            group: 'games',
            memberName: 'leaderboard',
            description: 'Discover who is the top dog of buddybucks!',
            examples: [` leaderboard `],
            args: [{
              'key': 'all',
              'label': 'switch',
              'prompt': ' ',
              'type': 'string',
              'default': ' ',
              'infinite': false
            }],
       
        });
      }

    run(message, args) {
       	console.log(args.all)
		console.log('checking levels');
		
	  	const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
	  	const all = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 20;").all(message.guild.id);
	  
	  	
	  	console.log(all)
	  	console.log(all.length)
	    // Now shake it and show it! (as a nice embed, too!)
	    const embed = new Discord.RichEmbed()
	      .setTitle(`**Leaderboard**`)
	      .setAuthor(this.client.user.username, this.client.user.avatarURL)
	      .setDescription("Our top points leaders!")
	      .setColor(0x8a2be2);

		if (args.all === ' ') {

			console.log('top ten')
			for(const data of top10) {
	      		embed.addField(this.client.users.get(data.user).tag, `**${Math.floor(data.points)}** points (level **${data.level}**)`);
	      		
	      	}
	    return message.channel.send({embed});
	    console.log('Getting all')

      	} if (args.all == 'all') {}{

      		for(const data of all) {

      			console.log(all)
	      		embed.addField(this.client.users.get(data.user).tag, `**${data.points}** points (level **${data.level}**)`);
	      		
			}
		return message.channel.send({embed});
        }


            
	}//end of run
}// end of command
