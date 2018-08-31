const { Command } = require('discord.js-commando');
const sql = require("sqlite");
sql.open("./score.sqlite"); 
module.exports = class GivePointsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'give-buddybucks',
            aliases: ['give', 'add-points', 'give-points'],
            group: 'games',
            memberName: 'givebuddybucks',
            description: 'a command for giving another user buddybucks.',
            examples: [` give your hard earned buddybucks to your buddy!`],
            args: [{

            key: 'user',
            label: 'user',
            prompt: 'What user would you like to give to? This takes from your balance! Please mention one only.',
            type: 'member',
            infinite: false
          },
          {
            key: 'amount',
            label: 'amount',
            prompt: 'What amount would you like to give?',
            type: 'float',
            infinite: false
          }],
          guarded: true
        });
      }

  run(message, args) {
    console.log('lets give some buddybucks!');

        const botlog=this.client.channels.find('name','bot-logs');
        if (args.user.id == message.author.id)return message.reply("You can't give yourself points!");
        sql.get(`SELECT * FROM scores WHERE userId ="${args.user.id}"`).then(row => {
            if (row) {
              console.log('giving bucks')
              const curPts = parseInt(row.points, 10);
              const newPts = curPts + args.amount;
              

              sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row =>{

                const authorBal = parseInt(row.points,10);
                const newAuthBal = authorBal - args.amount;
                if(authorBal < args.amount)return message.reply("You can't give more than you have");

              sql.run(`UPDATE scores SET points = ${newAuthBal} WHERE userId = ${message.author.id}`);
                console.log('taking points from giver')

            
              sql.run(`UPDATE scores SET points = ${newPts} WHERE userId = ${args.user.id}`);
                console.log('adding points to getter')
                console.log(curPts);
                console.log(newPts);

              botlog.send(`${args.amount} Buddybucks awarded to ${args.user.user.tag}. They have a balance of ${newPts} buddybucks`);
              message.reply(`Finished. ${args.amount} Buddybucks awarded to ${args.user.user.tag}`);

              })

            } else {
              message.reply(`The user ${args.user.user.tag} doesn't have a scores account! Creating one now...`);
              sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [args.user.id, 0]);
              message.reply('Account created.');
            }
            
          })
            .catch(err => {
              if (err) console.error(`${err} \n${err.stack}`);
              sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER)').then(() => {
                sql.run('INSERT INTO scores (userId, points) VALUES (?, ?)', [args.user.id, 0]);
                message.reply('Table did not exist, user inserted into new table.');
              });
            });
    
  }//end of run
}