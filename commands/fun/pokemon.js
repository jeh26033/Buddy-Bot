const {Command} = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const sql = require("sqlite");
sql.open("./score.sqlite"); 
const pokemon = require("../../json/pokemon.json");
module.exports = class PokemonCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pokemon',
            group: 'fun',
            memberName: 'pokemon',
            description: 'Guess that pokemon!',
            examples: ['pokemon'],
           
            
        });
    }
  async run(message, args, level) { // eslint-disable-line no-unused-vars

    const botlog=this.client.channels.find('name','bot-logs');
    let score = this.client.getScore.get(message.author.id, message.guild.id);
    
    const rand = Math.floor(Math.random() * 802);
    const poke = rand > 0 ? rand : Math.floor(Math.random() * 802);
    const pokem = pokemon[poke];

    const embed =  new Discord.RichEmbed()
      .setTitle("You have 15 seconds to guess ! Who's that Pokémon !")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setImage(pokem.imageURL)
      .setColor(6192321);
    
    const msg = await message.channel.send({ embed });
    const filter = m => m.author.id === message.author.id;
    const attempts = await msg.channel.awaitMessages(filter, { time: 15000, max: 1 });
      
    if (!attempts || !attempts.size) {
      msg.delete();
      return message.channel.send(`Ba-Baka! You took too long to answer. It was ${pokem.name}.`);
    } 
      
    const answer = attempts.first().content.toLowerCase();  
      
    if (answer === pokem.name.toLowerCase()) {
      await msg.delete({embed: null});
      if (score){
        const curPts = score.points;
        score.points += 50;
        this.client.setScore.run(score);
        botlog.send(`50 Buddybucks removed from ${message.author.tag}.  ${score.points} buddybucks remain.`);
      }
      return msg.channel.send(`Yatta! Well done, ${pokem.name} was correct. Here's some BB`);
    }
    await msg.edit({embed: null});
    return msg.channel.send(`Ba-Baka! You answered incorrectly, It was **${pokem.name}.**`);
  } 

};