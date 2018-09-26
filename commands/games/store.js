const { Command } = require('discord.js-commando');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
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
	 let score = this.client.getScore.get(message.author.id, message.guild.id);

    // If the score doesn't exist (new user), initialize with defaults. 

 
	
			message.reply({embed: {
			color: 3447003,
			description: `Your current level is **${score.level}**, you have **${score.points}** buddybucks`,
			title:"World Famous buddybuck Store!",
			fields: [{
						        
				name: "bird",
				description:"A lovely Bird Gif",
		        value: "10 Buddybucks"
		      },	
		      {	        
		        name: "dog",
		        description:"Sends a wholesome gif of a dog",
		        value: "10 Buddybucks"
		      },
		      {		      
		        name: "owl",
		        description:"posts a magnificent owl Gif",
		        value: "10 Buddybucks"
		      },
		      {
		        name: "kill",
		        description:"A murder most fowl",
		        value: "100 Buddybucks"
		      },
		      {
		        name: "Hug",
		        description:"A good way to make up for wrongful deaths",
		        value: "120 Buddybucks"
		      },
		      {
		      	name:"covertkill",
		      	description:"a sneaky assassination!",
		      	value:"200 BuddyBucks"
		      },
		      {
		        name: "Sensual Story",
		        description:"holy shit you don't want to know",
		        value: "100,000 Buddybucks"
		      }
		    ]
			}});

		};//end of if
	}//end of run

