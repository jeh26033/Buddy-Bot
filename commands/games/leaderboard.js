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
            examples: [` leaderboard `]
       
        });
      }

    run(message) {
       
		console.log('checking levels');
		
	  	const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

	    // Now shake it and show it! (as a nice embed, too!)
	    const embed = new Discord.RichEmbed()
	      .setTitle(`**Leaderboard**`)
	      .setAuthor(this.client.user.username, this.client.user.avatarURL)
	      .setDescription("Our top 10 points leaders!")
	      .setColor(0x00AE86);

	    for(const data of top10) {
	      embed.addField(this.client.users.get(data.user).tag, `**${data.points}** points (level **${data.level}**)`);
	    }
	    return message.channel.send({embed});

		


            
	}//end of run
}// end of command
