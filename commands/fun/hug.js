const {Command} = require('discord.js-commando');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
//const sql = require("sqlite");
//sql.open("./score.sqlite"); 
module.exports = class HugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'fun',
            memberName: 'hug',
            description: 'Asks who to hug, and then sends them a nice hug. Costs 120BBs',
            examples: ['reply'],
            args:[
                {
                    key:'user',
                    prompt:'WHO NEEDS hugging.',
                    type:'user'
                }
            ]
        });
    }
    run(message, { user }) {
        const botlog=this.client.channels.find('name','bot-logs');
        let score = this.client.getScore.get(message.author.id, message.guild.id);
        console.log('Taking bucks for killz')
        if (!score) {
          score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
        }
        if (score.points < 120)return message.reply("Yo! I don't hug for FREE. I need 120 BUDDYBUCKS")
        if (score){
            const curPts = score.points;
            score.points -= 120;
            this.client.setScore.run(score);
            botlog.send(`100 Buddybucks removed from ${message.author.tag}. You have a balance of ${score.points} buddybucks.`);
            message.say(':heart: takin aim :heart:');
            console.log('Hugged!');
            message.say(':hugging: HAVE HUG :hugging:');
            user.send(':hugging: :robot:  :hugging:  :robot:  :hugging: :robot:  :hugging: :robot:  :hugging: ')
            return message.say('HUGGED that HUMAN');
        }

    }
};