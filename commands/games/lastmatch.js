const { Command } = require('discord.js-commando');
const Mika = require("mika");
var mika = new Mika();
const findHero = require("../../util/findHero");
const findHero = require("../../util/findHero");
const aliases = require("../../json/aliases.json")
const sql = require("sqlite");
sql.open("./score.sqlite"); 
module.exports = class LastMatchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lastmatch',
        
            group: 'games',
            memberName: 'lastmatch',
            description: 'Displays Static Hero Information',
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
                console.log(match)
                let player_slot = match.player_slot;
                let match_id=match.match_id;
                let match_hero=match.hero_id;
                let match_duration = match.duration
                let kills = match.kills;
                let deaths = match.deaths;
                let radiant_win = match.radiant_win;
                let assists=match.assists;
                let kda = `${kills}/${deaths}/${assists}`
                console.log(match_id)
                let hero =  aliases.find((hero) => hero.id == match.hero_id).local;
                let isRadiantColor;
                let isRadiant;
                let victory;
                let heroIcon =  aliases.find((hero) => hero.id == match.hero_id).emo;
                let ptime = `${Math.floor(match.duration / 60)}:${("00" + match.duration % 60).substr(-2, 2)}`;
                //determines side
                if (player_slot <= 128 ) {
                    isRadiant = true;
                    isRadiantColor= 0x339933

                }else{
                    isRadiant = false;
                    isRadiantColor= 0xf00e0e
                }

                if(isRadiant && radiant_win){
                    victory= 'Victory';
                }else if(!isRadiant && !radiant_win){
                    victory= 'Victory';
                }else{
                    victory='Defeat';
                }

                console.log(isRadiant)
                message.reply({embed: {
                    color: isRadiantColor,
                    "author": {
                        "icon_url": `http://cdn.dota2.com${hero.icon}`
                    },
                    "fields": [{
                                "name": `Match ID`,
                                "value": `${match_id}`,
                                "inline": true
                            },
                            {
                                "name": `Victory or Defeat`,
                                "value": `${victory}`,
                                "inline": true
                            }, 
                            {
                                "name": `Hero`,
                                "value":`${hero}`,
                                "icon_url": `http://cdn.dota2.com${hero.icon}`,
                                "inline": true
                            }, {
                                "name": `KDA`,
                                "value": `${kda}`,
                                "inline":false
                            }, {
                                "name": "Duration",
                                "value":`${ptime}`,
                                "inline":false
                            }]
                }});
   
                /*match_id: 4113233935,
                  player_slot: 3,
                  radiant_win: false,
                  duration: 3252,
                  game_mode: 22,
                  lobby_type: 0,
                  hero_id: 69,
                  start_time: 1536712777,
                  version: 21,
                  kills: 6,
                  deaths: 12,
                  assists: 15,
                  skill: 2,
                  leaver_status: 1,
                  party_size: 5 */

            }).catch((err) => console.log(err));
        }  catch (err) {
        ctx.error(err);
        return ctx.failure(ctx.strings.get("bot_mika_error"));
    }
        
        
    }//main if
    

}
}
