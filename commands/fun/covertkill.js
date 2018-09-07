const {Command} = require('discord.js-commando');
//const sql = require("sqlite");
//sql.open("./score.sqlite"); 
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
module.exports = class CovertkillCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'covertkill',
            group: 'fun',
            memberName: 'covertkill',
            description: 'A secret assasination, be sneaky about using this',
            examples: ['covertkill @user'],
            args:[
                {
                    key:'user',
                    prompt:':smoking:Target?:syringe:',
                    type:'user'
                }
            ]
        });
    }
    run(message, { user }) {

       
        
        console.log('bang bang');
        const botlog=this.client.channels.find('name','bot-logs');
        let score = this.client.getScore.get(message.author.id, message.guild.id);
        console.log('Taking bucks for thrillz')
        if(user.bot)return message.reply('Why would I do that?');
        if (!score) {
          score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
        }
        if (score.points < 200)return message.reply("This kind of work isn't cheap. I need 200 Buddybucks for my silence.")
        if (score){
            const curPts = score.points;
            score.points -= 200;
            this.client.setScore.run(score);
            message.guild.member(user).setNickname(`☠${user.username}☠`)

            botlog.send(`200 Buddybucks removed from ~~${message.author.tag}~~.`);
            setTimeout(nameChange, 10000);
            function nameChange() {
                message.guild.member(user).setNickname('');
            }
            user.send(`:skull_crossbones: :smoking: :syringe: :smoking: :skull_crossbones: :coffin: :urn: :amphora:`);
            botlog.send(`${user.tag} has been silently murders`);
           
        }
        message.delete();
    }
}