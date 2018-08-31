const { Command } = require('discord.js-commando');
const sql = require("sqlite");
sql.open("./score.sqlite"); 
module.exports = class StoreCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'store',
            aliases: ['stores','sale','buddybucks'],
            group: 'games',
            memberName: 'store',
            description: 'Find out the current offerings for your hard-earned buddybucks! list will be growing all the time',
            examples: [` store `]
       
        });
      }

    run(message) {
       
	console.log('checking levels');
	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
		if (!row) return message.reply("Your current level is 0");
			message.reply({embed: {
			color: 3447003,
			description: `Your current level is **${row.level}**, you have **${row.points}** buddybucks`,
			title:"World Famous buddybuck Store!",
			fields: [{
				
		        name: "kill",
		        value: "100 Buddybucks"
		      },
		      {
		        name: "Hug",
		        value: "120 Buddybucks"
		      },
		      {
		        name: "story",
		        value: "1,000 Buddybucks"
		      },
		      {
		        name: "Sensual Story",
		        value: "100,000 Buddybucks"
		      }
		    ]
			}});

		});//end of if
	}//end of run
}// end of command
