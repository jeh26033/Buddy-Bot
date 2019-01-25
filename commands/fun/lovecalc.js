const {Command} = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
module.exports = class LoveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'love',
            group: 'fun',
            memberName: 'lovecalc',
            description: 'tells how much you love someone',
            examples: ['love user'],
            args: [{
                key: 'user',
                label: 'user',
                prompt:  'How will I tell you, how much you love someone, if I don\'t know who!',
                type: 'user',
                infinite: false
              }]
            
        });
    }
    async run(message, args) {
        
        console.log(args.user.username)
        const data = await get(`https://love-calculator.p.mashape.com/getPercentage?fname=${message.author.username}&sname=${args.user.username}`).set("X-Mashape-Key", "j2boY6f36FmshbNg9ILjGBBPErump1b4W26jsnyF2PLCu6Ofka");
        const embed = new Discord.RichEmbed()
          .setThumbnail("http://images6.fanpop.com/image/answers/3317000/3317487_1375024940496.53res_300_202.jpg")
          .addField("Lover", message.author.username)
          .addField("Crush", args.user.username)
          .addField("Love Percent", data.body.percentage)
          .setFooter(data.body.result)
          .setColor(0xFF0000);
      
    message.channel.send({ embed });

    }
};