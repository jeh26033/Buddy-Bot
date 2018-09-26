const { Command } = require('discord.js-commando');
const Mika = require("mika");
var mika = new Mika();
const hero_names = require("dotaconstants").hero_names;
const findHero = require("../../util/findHero");
const heroes = require("../../json/heroes");
const aliases = require("../../json/aliases.json")
const sql = require("sqlite");
sql.open("./score.sqlite"); 
module.exports = class LastMatchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lastmatch',
            group: 'games',
            memberName: 'lastmatch',
            description: 'Displays information about your last match',
            examples: [` `],
            
     
        });
      }

    async run(message, args, client) {
    let score = this.client.getScore.get(message.author.id, message.guild.id);
    console.log(score.dotaid);
    // If the score doesn't exist (new user), initialize with defaults. 
    if (!score.dotaid) {
      return message.say('please run the dota commmand first to enter your dota id')
    }else{
        let match;
        let mikaOpts = {
            limit: 1,
            significant: 0
        };
        try{
            
            match= mika.getPlayerMatches(score.dotaid).then((match)=> {
                match = match[0];

                let player_slot = match.player_slot;
                let match_id=match.match_id;
                let match_hero=match.hero_id;
                let match_duration = match.duration
                let kills = match.kills;
                let deaths = match.deaths;
                let radiant_win = match.radiant_win;
                let assists=match.assists;
                let kda = `${kills}/${deaths}/${assists}`
                console.log(`match id: ${match_id}`)

                //gets some hero stuff
                let hero =  aliases.find((hero) => hero.id == match.hero_id).local;
                let res = findHero(hero);
                console.log(res)
                let hero_obj = heroes.find((hero) => hero.name == `npc_dota_hero_${res.name}`);
                hero_obj = JSON.parse(JSON.stringify(hero_obj));

                let isRadiantColor;
                let isRadiant;
                let victory;
                let icon= `http://media.steampowered.com`+hero_obj.icon;
                let link_url = `https://www.dotabuff.com/matches/`+match_id
            
                //converts duration into human time.
                let ptime = `${Math.floor(match.duration / 60)}:${("00" + match.duration % 60).substr(-2, 2)}`;

                //determines side
                if (player_slot <= 128 ) {
                    isRadiant = true;
                    isRadiantColor= 0x339933

                }else{
                    isRadiant = false;
                    isRadiantColor= 0xf00e0e
                }

                //determines who won
                if(isRadiant && radiant_win){
                    victory= 'Victory';
                }else if(!isRadiant && !radiant_win){
                    victory= 'Victory';
                }else{
                    victory='Defeat';
                }

                message.reply({embed: {
                    color: isRadiantColor,
                    "title": `Your latest DoTA Match`,
                    "description": `${victory}`,
                    "url":link_url,
                    "thumbnail": {
                              "url": icon
                            },
                    "fields": [{
                                "name": `Match ID`,
                                "value": `${match_id}`,
                                "inline": true
                            },
                            {
                                "name": `Hero`,
                                "value":`${hero}`,
                                "inline": true
                            }, {
                                "name": `KDA`,
                                "value": `${kda}`,
                                "inline":true
                            }, {
                                "name": "Duration",
                                "value":`${ptime}`,
                                "inline":true
                            }]
                }});
   
       

            }).catch((err) => console.log(err));
        }  catch (err) {
        ctx.error(err);
        return ctx.failure(ctx.strings.get("bot_mika_error"));
    }
        
        
    }//main if
    

}
}
