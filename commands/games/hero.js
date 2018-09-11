const abilities = require("../../json/abilities");
const heroes = require("../../json/heroes");
const findHero = require("../../util/findHero");
const heroEmbed = require("../../embeds/hero");

const qwedfr = {
    "Q": 0,
    "W": 1,
    "E": 2,
    "D": 3,
    "F": 4,
    "R": 5
};

const { Command } = require('discord.js-commando');
const sql = require("sqlite");
sql.open("./score.sqlite"); 
module.exports = class HeroCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hero',
        
            group: 'games',
            memberName: 'hero',
            description: 'Displays Static Hero Information',
            examples: [` Hero antimage`],
            args: [{
                    'key': 'hero',
                    'label': 'hero',
                    'prompt': 'What hero',
                    'type': 'string',
                    'default': ' ',
                    'infinite': false
                  }],
     
        });
      }

    run(message, args, client) {
       
        let alias = args.hero;

        let res = findHero(alias);
        if (!res) {
            return console.log('no hero')
        }

        let hero_obj = heroes.find((hero) => hero.name == `npc_dota_hero_${res.name}`);
        console.log(hero_obj);
        hero_obj = JSON.parse(JSON.stringify(hero_obj));
        hero_obj.abilities = hero_obj.abilities
            .map((ability) => {
                ability = abilities.find((a) => a.name == ability);
                if (!ability) return null;
                return ability.key && `${ability.key.toUpperCase()} - ${ability.dname}`;
            })
            .filter((a) => a)
            .sort((a, b) => qwedfr[a.charAt(0)] - qwedfr[b.charAt(0)]);
        
       
            return(heroEmbed(client, hero_obj, message))
     
    
  }//end of run
}