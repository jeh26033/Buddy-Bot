const {Command} = require('discord.js-commando');
const { DotaWikiApi } = require('dota-wiki-api');

const wikiApi = new DotaWikiApi({
    userAgentValue: 'BuddyBot__WSKB',
});

module.exports = class TeamCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'team',
            group: 'games',
            memberName: 'team',
            description: 'Fetches team info',
            examples: [`team EG`],
            args: [{
                'key': 'team',
                'label': 'team',
                'prompt': 'What team',
                'type': 'string',
                'default': ' ',
                'infinite': false
            }],
        });
    }

    async run(message, args) {
        console.log(args.team)
        const alias = args.team;

message.channel.startTyping()
        if (!alias) {
            message.say('please provide a team')
            return console.log('no team provided')

        }

       try{
            const teamInfo = await wikiApi.getTeam(alias);
            let roster=teamInfo.roster
            console.log(teamInfo)
            console.log(teamInfo.name)
            const teamURL = `https://liquipedia.net/dota2/${teamInfo.name}`
            console.log(teamURL)
            
            roster=roster.map(member => (
                                `**${member.handle}** (${member.name}) ${member.isCaptain ? '👑' : ''} Joined: ${member.joinDate}, position: ${member.position}`)).join("\n")
            
            message.say({embed: {
                    color: 0x8a2be2,
                    author: {
                        name: teamInfo.name,
                        icon_url: teamInfo.teamLogo,
                  
                    },
                    fields: [{
                        
                            name: 'Region',
                            value: teamInfo.region
                            
                        },
                        {
                            name: 'Roster',
                            value: roster
                          
                        },
                        {
                            name: 'Location',
                            value: teamInfo.location
                          
                        },                        
                        {
                            name: 'Earnings',
                            value: teamInfo.earnings
                          
                        },                        


                    ]
                }

        });
    }catch (e) {
            message.say(`Could not find team matching: \`${alias}\`. Try a different spelling or capitalizing it`)
        }
    message.channel.stopTyping();

    }//end of run

}

