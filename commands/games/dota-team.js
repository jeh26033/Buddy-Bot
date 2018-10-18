import { Command } from 'discord.js-commando';
import { DotaWikiApi } from 'dota-wiki-api';

const wikiApi = new DotaWikiApi({
    userAgentValue: 'BuddyBot__WSKB',
});

export default class HeroCommand extends Command {
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
        const alias = args.key;

        if (!alias) {
            return console.log('no team provided')
        }

        try {
            const teamInfo = await wikiApi.getTeam(alias);
            message.say({
                embed: {
                    color: 3447003,
                    "author": {
                        "name": team.name,
                        "url": `https://liquipedia.net/dota2/${teamInfo.name}`,
                    },
                    "fields": [
                        {
                            "name": 'Region',
                            "value": teamInfo.region,
                            "inline": true
                        },
                        {
                            "name": 'Roster',
                            "value": teamInfo.roster.map(member => (
                                `**${member.handle}** (${member.name}) ${member.isCaptain ? '👑' : ''}`.join("\n")
                            )),
                            "inline": true
                        },
                    ]
                }
            });
        } catch (e) {
            message.say(`Could not find team matching: \`${alias}\`.  Please try again`)
        }



    }//end of run
}