// eslint-disable-line no-unused-vars
const FuzzySet = require("fuzzyset.js");
const {Command} = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const sql = require("sqlite");
sql.open("./score.sqlite"); 
const scoreChange  = require('../../util/scoreChange.js');

const pokemon = require("../../json/pokemon.json");
module.exports = class PokemenCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pokemen',
            group: 'fun',
            memberName: 'pokemen',
            description: 'Guess that pokemon!, party edition!',
            examples: ['pokemon'],
           
            
        });
    }
  async run(message, args, level) { 
    
    const rand = Math.floor(Math.random() * 802);
    const poke = rand > 0 ? rand : Math.floor(Math.random() * 802);
    const pokem = pokemon[poke];

    console.log(pokem);

    const embed =  new Discord.RichEmbed()
      .setTitle("You have 15 seconds to guess ! Who's that Pokémon !")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setImage(pokem.imageURL)
      .setColor(6192321);
    

    
      const msg = await message.channel.send({ embed });
      msg.channel.startTyping();
      const filter = m => m.content === pokem.name.toLowerCase();
      const collector =await msg.channel.createMessageCollector(filter, { time: 15000 });
      
      collector.on('collect', m => m.reply(`YEET! Well done, ${pokem.name} was correct. Here's 50 BB`));
      collector.on('collect', m => scoreChange(message, '+',50));
      collector.on('collect', m => collector.stop('end'));
      msg.channel.stopTyping();

      collector.on('end', m => message.channel.send(`The answer was ${pokem.name}!`));

    
    //const answer = collector.first().content.toLowerCase();
    //const attempts =  msg.channel.awaitMessages(filter, { time:15000 });

    

   /* if (!collector || !collector.size) {
      return message.channel.send(`You took too long to answer. It was ${pokem.name}.`);
    } 
    //const answers = collector.map(i=> m.content).join("\n");
    //const answer = collector.collected.find(item => collector.includes(pokem.name.toLowerCase()));  
    //if(!collector) return console.log('slowpoke');
    if (answer === pokem.name.toLowerCase()) {

          console.log(answer)
          return msg.channel.send(`YEET! Well done ${message.author.tag} , ${pokem.name} was correct. Here's 50 BB`);
        }else {
          message.reply('nope')
      }*/
 
  }

}

