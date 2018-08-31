const { Command } = require('discord.js-commando');
const sql = require("sqlite");
const db = sql.open("./score.sqlite"); 
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
	
		const point = sql.get(`SELECT * FROM scores ORDER BY points`).then(points => {
			console.log(message.author.username);
		console.log(points)
	})            .catch(err => {
              if (err) console.error(`${err} \n${err.stack}`);
              
            });
    

		


            
	}//end of run
}// end of command
