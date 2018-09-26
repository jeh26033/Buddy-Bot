const {Command} = require('discord.js-commando');
const sql = require("sqlite");
sql.open("./score.sqlite"); 
const commando = require('discord.js-commando');
const { oneLine, stripIndents } = require('common-tags');
const { RichEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = class InhouseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'inhouse',
            group: 'games',
            memberName: 'inhouse',
            description: 'Lets people join a queue for inhouses, then pings when enough people have joined',
            examples: ['Inhouse'],
            args: [{
                key: 'ping',
                label: 'pingrole',
                prompt: 'Do you want to ping the dota role, yes or no?',
                type: 'string',
                infinite: false
              }]

        });

    }
    hasPermission(msg) {
    if (!this.client.isOwner(msg.author)) return 'Only the bot owner(s) may use this command.';    
    return this.client.isOwner(msg.author);
}
    async run(message, args) {

        //gets the dota role for the specific server
        let dotaRole = message.guild.roles.find('name','Dota 2');
        
        //getting the list of people who have subbed to the dota role
        //console.log(message.guild.roles.get(dotaRole.id).members)

        //makes the list of all people with dota role by ID
        let potentialDotaBois= message.guild.roles.get(dotaRole.id).members.map(m=>m.user.id).join('\n');

        //makes the list of all people with dota role by name
        let potentialDotaBoisName= message.guild.roles.get(dotaRole.id).members.map(m=>m.user.username).join('\n');

        //splits that list into an array
        let potentialDotaBoisArray = potentialDotaBois.split('\n')
        

        //the pingy part.
        console.log(args.ping)
        if (args.ping==='yes') {
            for (var i = potentialDotaBoisArray.length - 1; i >= 0; i--) {
                message.channel.send("<@!" + potentialDotaBoisArray[i] + ">");
            }
        }

        //the embed for list of people with the role
        /*
        const ListEmbed = new Discord.RichEmbed()
            .setTitle(`Users with dota 2 role`)
            .setDescription(potentialDotaBoisName)
        message.channel.send(ListEmbed);
        */

        //the starting count
        let count = 0;

        //inhouse queue in ping format
        let dotaBoys = []

        //inhouse queue without pings
        let dotaBoysNameArray=[]

        //current list message

        let currentList= `we have ${dotaBoys.length} DotaBois and gurls`;
        //message.channel.send(currentList);
        const reactEmbed = new Discord.RichEmbed()
            .setColor('0x8a2be2')
            .setTitle(`React to this message with 🏠 to get a spot in the next Whiskey Inhouse`)
            .setDescription(`Users will be alerted when a full house is achieved. This lasts for 1 hour.`)

        message.channel.send(reactEmbed)
        .then(msg => {
            msg.delete(3600000)
            
            })
            .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

        
        this.client.on('messageReactionAdd', (reaction, user) => {

            if(reaction.emoji.name === "🏠") {

                //the person who is in the inhouse queue    
                let dotaBoi= reaction.message.guild.members.get(user.id)
                console.log(`dotaboi: ${dotaBoi}`)

                //the name of the person
                let dotaBoyName = user.username

                //adds a dotaboi to the list of ping names
                dotaBoys.push(dotaBoi);

                //adds a dota boi to the list of regular names
                dotaBoysNameArray.push(dotaBoyName)
                console.log(`DotaBoysNameArray ${dotaBoysNameArray}`)

                //message to update

                this.client.user.lastMessage.edit(
                    {embed: {
                      color: 3447003,
                      description:`we have ${ dotaBoys.length} DotaBois and gurls\n${dotaBoysNameArray.join(' ,')}`
                }})
                    
                //the debugs
                console.log(`dotaBoys:${dotaBoys}`)
                console.log(`dotaBoi:${dotaBoi}`)

                //iterator
                count++
                console.log(count);
                
                //the check to see if we have enough
                if (count === 10) {

                    //reset count
                    count=0

                    //the embed
                    const fullInhouse = new Discord.RichEmbed()
                        .setTitle(`Dota Time!`)
                        .setDescription(dotaBoys)
                    message.channel.send(fullInhouse)
                    
                    //clears the arrays
                    dotaBoys.length = 0
                    potentialDotaBoisArray.length=0
                    dotaBoysNameArray.length=0
                    //console.log(reaction.message.guild.members.get(user.id));
                }
            }
        });
        this.client.on('messageReactionRemove', (reaction, user) => {
            if(reaction.emoji.name === "🏠") {
                //the person who is in the inhouse queue   
                let dotaBoyName = user.username; 
                let dotaBoi= reaction.message.guild.members.get(user.id)
                //inhouse queue
               
                //takes a dotaboi from the list
                dotaBoys.pop(dotaBoi);
                dotaBoysNameArray.pop(dotaBoyName)

                count--
                this.client.user.lastMessage.edit(
                    {embed: {
                              color: 3447003,
                              description:`we have ${dotaBoys.length} DotaBois and gurls\n${ dotaBoysNameArray.join(' ,')}`
                    }})
               // this.client.user.lastMessage.edit(`we have ${dotaBoys.length} DotaBois and gurls`);
                
                

                console.log(`dotaBoys:${dotaBoys}`)
                console.log(`dotaBoy:${dotaBoi}`)
                console.log(`Removed ${count}`);
            }
        });
        

    }
};