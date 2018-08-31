const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const { oneLine, stripIndents } = require('common-tags');
const { RichEmbed } = require('discord.js');

module.exports = class joinRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'joinables',
            group: 'role',
            memberName: 'joinables',
            description: 'displays a message that allows a user to react to it to be assigned a role.',
            examples: ['dota-role']
        });
    }
    hasPermission(msg) {
    if (!this.client.isOwner(msg.author)) return 'Only the bot owner(s) may use this command.';    
    return this.client.isOwner(msg.author);
}
    run(msg) {
        console.log('starting role message');
        const dotaEmoji = this.client.emojis.get("364894746843414538");
   
        const embed = {
            "title": "Joinables",
            "description": "```Hi! Welcome to Whiskey Business. Please react with one of the emojis below in order to get added to various topic channels```",
            "color": 9442302,
            "fields": [
              {
                "name": "*Roles*",
                "value":  `React to this message with: \n 💻 to activate join the **Dota 2** role
                💰 to activate join the **Sim Game** role\n 🏈 to activate join the **Sports** role
                🎲 to activate join the **Tabletop RPG** role \n 🤣 to activate join the **Memes** role
                📷 to activate join the **Screenshots and pictures** role.`}
             ]

            

        };
        msg.say({ embed });  
        const botlog=this.client.channels.find('name','bot-logs');
        const DOTA2ROLE = '484056265715220480';
        const SIMGAMEROLE='476493421788528640';
        const SPORTSROLE='476493456764698625';
        const TTRPGS='476493521608769547';
        const MEMEROLE='476493552843620365';
        const SCREENSHOTPICROLE='476493579095769110'
        //Dota: 💻
        //Sims: :moneybag: 
       // Sports :football: 
       // Tabletop :game_die: 
       // Memes :rofl: 
        //Screenshots/Pics: :camera:

            //dota 2 role
            this.client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name  ==='💻') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(DOTA2ROLE);
                    guildMember.addRole(botDevRole);
                    guildMember.send('Added Dota 2 role');
                    console.log('dota role added');
                    botlog.send(`Dota role added to ${user}`);
                }
            });
            this.client.on('messageReactionRemove', (reaction, user) => {
                if (reaction.emoji.name === '💻') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(DOTA2ROLE);
                    botlog.send(`Dota role removed from ${user}`);
                    guildMember.removeRole(botDevRole);
                    guildMember.send('Dota role removed');
                    console.log('Dota role removed');
                    
                }
            });

            //sim gaming role
            this.client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name  ==='💰') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(SIMGAMEROLE);
                    guildMember.addRole(botDevRole);
                    guildMember.send('Added Sim Gaming role');
                    console.log('Sim gaming role added');
                    botlog.send(`Sim Gaming role added to ${user}`);
                }
            });
            this.client.on('messageReactionRemove', (reaction, user) => {
                if (reaction.emoji.name === '💰') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(SIMGAMEROLE);
                    guildMember.removeRole(botDevRole);
                    guildMember.send('Sim Gaming role removed');
                    console.log('Sim gaming role removed');
                    botlog.send(`Sim Gaming role removed from ${user}`);
                }
            });

            //Sports role
            this.client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name  ==='🏈') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(SPORTSROLE);
                    guildMember.addRole(botDevRole);
                    guildMember.send('Added Sports Role');
                    console.log('Added sports role');
                    botlog.send(`Sports role added to ${user}`);
                }
            });
            this.client.on('messageReactionRemove', (reaction, user) => {
                if (reaction.emoji.name === '🏈') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(SPORTSROLE);
                    guildMember.removeRole(botDevRole);
                    guildMember.send('Removed Sports role');
                    console.log('Removed Sports role');
                    botlog.send(`Sports role removed from ${user}`);
                }
            });

            //TT RPG role
            this.client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name  ==='🎲') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(TTRPGS);
                    guildMember.addRole(botDevRole);
                    guildMember.send('Added Tabletop RPG role');
                    console.log('TTRPG role added');
                    botlog.send(`TTRPG role added to ${user}`);
                }
            });
            this.client.on('messageReactionRemove', (reaction, user) => {
                if (reaction.emoji.name === '🎲') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(TTRPGS);
                    guildMember.removeRole(botDevRole);
                    guildMember.send('Tabletop RPG role removed');
                    console.log('TTRPG role removed');
                    botlog.send(`TTRPG removed from ${user}`);
                }
            });

            //meme role
            this.client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name  ==='🤣') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(MEMEROLE);
                    guildMember.addRole(botDevRole);
                    guildMember.send('Added Meme role');
                    console.log('Meme role added');
                    botlog.send(`Memes role added to ${user}`);
                }
            });
            this.client.on('messageReactionRemove', (reaction, user) => {
                if (reaction.emoji.name === '🤣') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(MEMEROLE);
                    guildMember.removeRole(botDevRole);
                    guildMember.send('Removed Memes role removed');
                    console.log('remeoved memes role removed');
                    botlog.send(`Memes role removed from ${user}`);
                }
            });

            //pics and screen shot role
            this.client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name  ==='📷') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(SCREENSHOTPICROLE);
                    guildMember.addRole(botDevRole);
                    guildMember.send('Added Screen shot and pictures role');
                    console.log('Added screen shot and picture role added');
                    botlog.send(`Photo role added to ${user}`);
                }
            });
            this.client.on('messageReactionRemove', (reaction, user) => {
                if (reaction.emoji.name === '📷') {
                    let guildMember = reaction.message.guild.members.get(user.id);
                    let botDevRole = reaction.message.guild.roles.get(SCREENSHOTPICROLE);
                    guildMember.removeRole(botDevRole);
                    guildMember.send('Screen shot and picture role removed');
                    console.log('screen shot and picture role removed');
                    botlog.send(`Photo role removed from ${user}`);

                }
                
            });

    }
};




            
       
            

 