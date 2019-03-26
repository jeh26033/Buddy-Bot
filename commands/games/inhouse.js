const {Command} = require('discord.js-commando');
const sql = require("sqlite");
sql.open("./score.sqlite"); 
const commando = require('discord.js-commando');
const { oneLine, stripIndents } = require('common-tags');
const { RichEmbed } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();

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

    async run(message, args) {
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.say('You have no power here!'); 
        

        //gets the dota role for the specific server
        let dotaRole = message.guild.roles.find('name','Dota 2');

        //the pingy part.
        console.log(args.ping)
        if (args.ping==='yes') {
            message.say('@here');
        }

        //the starting count
        let count = 0;

        //inhouse queue in ping format
        let dotaBoys = []

        //inhouse queue without pings
        let dotaBoysNameArray=[]

        //current list message

        //announcment channel
        const announcmentChannel= this.client.channels.find('name','announcements'); 

        let currentList= `we have ${dotaBoys.length} DotaBois and gurls`;
        //message.channel.send(currentList);

        const reactEmbed = new Discord.RichEmbed()
            .setColor('0x8a2be2')
            .setTitle(`React to this message with 🏠 to get a spot in the next Whiskey Inhouse`)
            .setDescription(`Users will be alerted when a full house is achieved. This lasts for 1 hour.`)

        //announcmentChannel.send(reactEmbed)
        //const msg = await message.channel.send( reactEmbed )
        const msg = await announcmentChannel.send(reactEmbed)
        msg.react('🏠');

        this.client.on('messageReactionAdd', (reaction, user) => {

            if(reaction.emoji.name === "🏠" && user.id!= msg.author.id) {

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

                msg.edit(
                    {embed: {
                      color: 0x8a2be2,
                      description:`We have ${ dotaBoys.length} DotaBois and gurls\n${dotaBoysNameArray.join(', ')}`
                }})

               const reactEmbedReminder = new Discord.RichEmbed()
                      .setColor('0x8a2be2')
                      .setDescription(`We have ${ dotaBoys.length} DotaBois and gurls\n${dotaBoysNameArray.join(', ')}\n\n Head to announcements to enter this exciting edition of WHISKEY BUSINESS INHOUSE`)
                message.channel.send(reactEmbedReminder)
                
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
                        .setTitle(`🎉Dota Time!🎉`)
                        .setDescription(dotaBoys)
                    message.channel.send(fullInhouse)
                    
                    //clears the arrays
                    dotaBoys.length = 0
                    dotaBoysNameArray.length=0
                }
            }
        });
        this.client.on('messageReactionRemove', (reaction, user) => {
            if(reaction.emoji.name === "🏠" && user.id!=  msg.author.id) {
                //the person who is in the inhouse queue   
                let dotaBoyName = user.username; 
                let dotaBoi= reaction.message.guild.members.get(user.id)
                //inhouse queue
               
                //takes a dotaboi from the list
                dotaBoys.pop(dotaBoi);
                dotaBoysNameArray.pop(dotaBoyName)

                count--
                msg.edit(
                    {embed: {
                      color: 0x8a2be2,
                      description:`We have ${dotaBoys.length} DotaBois and gurls\n${ dotaBoysNameArray.join(' ,')}`
                    }})
               // this.client.user.lastMessage.edit(`we have ${dotaBoys.length} DotaBois and gurls`);
                const reactEmbedReminder = new Discord.RichEmbed()
                      .setColor('0x8a2be2')
                      .setDescription(`We have ${ dotaBoys.length} DotaBois and gurls\n${dotaBoysNameArray.join(', ')}\n\n Head to announcements to enter this exciting edition of WHISKEY BUSINESS INHOUSE`)
                message.channel.send(reactEmbedReminder)
                

                console.log(`dotaBoys:${dotaBoys}`)
                console.log(`dotaBoy:${dotaBoi}`)
                console.log(`Removed ${count}`);
            }
        })
        
    msg.delete([3600000]);
    }
};