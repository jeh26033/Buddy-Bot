const {Command} = require('discord.js-commando');
const sql = require("sqlite");
sql.open("./score.sqlite"); 
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
        sql.get(`SELECT * FROM  scores WHERE userId ="${message.author.id}"`).then(row => {
            if (row.points < 120)return message.reply("Yo! I don't hug for FREE. I need 120 BUDDYBUCKS")
            if (row) {
                console.log('Taking bucks for hugz')
                const curPts = parseInt(row.points, 10);
                const newPts = curPts - 120;
                sql.run(`UPDATE scores SET points = ${newPts} WHERE userId = ${user.id}`);
                botlog.send(`100 Buddybucks removed from ${message.author.tag}. You have a balance of ${newPts} buddybucks.`);
                message.say(':smoking: takin aim :smoking:');
                console.log('Hugged!');
                message.say(':hugging: HAVE HUG :hugging:');
                user.send(':hugging: :robot:  :hugging:  :robot:  :hugging: :robot:  :hugging: :robot:  :hugging: ')
                return message.say('HUGGED that HUMAN');
            } else {
              message.reply(`The user ${user.tag} doesn't have a scores account! Creating one now...`);
              sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [user.id, 100]);
              message.reply('Account created.');
            }
          })
            .catch(err => {
              if (err) console.error(`${err} \n${err.stack}`);
              sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
                sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [user.id, 100]);
                message.reply('Table did not exist, user inserted into new table.');
              });
            });
       
    }
};