const {Command} = require('discord.js-commando');
const sql = require("sqlite");
sql.open("./score.sqlite"); 

module.exports = class ShootCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kill',
            group: 'fun',
            memberName: 'kill',
            description: 'Asks who to :gun:, and then pings them with a :gun:. Costs 100BB',
            examples: ['reply'],
            args:[
                {
                    key:'user',
                    prompt:':smoking: WHO NEEDS POPPIN :syringe:',
                    type:'user'
                }
            ]
        });
    }
    run(message, { user }) {
        console.log('BANG BANG');
        const botlog=this.client.channels.find('name','bot-logs');
         sql.get(`SELECT * FROM  scores WHERE userId ="${message.author.id}"`).then(row => {
            if (row.points < 100)return message.reply("Yo! I don't work for FREE. I need 100 BUDDYBUCKS FOO")
            if (row) {
                console.log('Taking bucks for killz')
                const curPts = parseInt(row.points, 10);
                const newPts = curPts - 100;
                sql.run(`UPDATE scores SET points = ${newPts} WHERE userId = ${user.id}`);
                botlog.send(`100 Buddybucks removed from ${message.author.tag}. You have a balance of ${newPts} buddybucks. :gun:`);
                message.say(':smoking: takin aim :smoking:');
                user.send(`:gun: :skull_crossbones: :skull_crossbones: :smoking: BLAP :smoking: :bow_and_arrow: :pick: BLAPBLAP :gun: BLAPBLAPBRR :gun: RRRRRRRP :gun: :bow_and_arrow: :scissors: BLAPBLAPBLAP :skull_crossbones: BLAPBLAPBRRRRRRRRRP:crossed_swords: :skull_crossbones:  BLAPBLAP :skull_crossbones: BLAPBLAP :scissors: :pick: :syringe: :dagger: :knife: :gun: :gun: BLAPBLAPBLAPBLAPBLAPBRRRRRRRRRP :smoking: :smoking:   :skull_crossbones: :coffin: :urn: :amphora:`);
                botlog.send(`${user.tag} has been brutally murders`);
                return message.say(`:skull_crossbones: Finished that foo, rest in peace ${user} :skull_crossbones: :coffin: :urn:`);
            } else {
              message.reply(`The user ${user.tag} doesn't have a scores account! Creating one now...`);
              sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [user.id, 0]);
              message.reply('Account created.');
            }
          })
            .catch(err => {
              if (err) console.error(`${err} \n${err.stack}`);
              sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
                sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [user.id, 0]);
                message.reply('Table did not exist, user inserted into new table.');
              });
            });
        
    }
};