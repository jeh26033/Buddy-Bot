const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');

module.exports = class FedCommand extends Command {
  constructor(bot) {
    super(bot, {
      name: 'fuck',
      aliases: ['fek','fuck you','fuck-you','fucking','get-fucked','getfucked','get fucked','hate','you\'re awful'],
      group: 'fun',
      memberName: 'fek',
      description: 'Watch your mouth',
      details: oneLine`
      this will teach them punks.
			`,
      examples: ['fekking']
    });
  }

  run(message) {
    let cryString  = `
    https://gph.is/18VfqMH
    https://gph.is/1IF8ykO
    https://gph.is/1nc5TZu
    https://gph.is/1SCKBl5
    https://gph.is/1OLudxc
    https://gph.is/2nqvsIF`
    let cryList = cryString.split('\n');
    
    cryList = cryList[Math.floor(Math.random() * cryList.length)];
    message.channel.send(cryList)
    message.channel.send(`What did I do to you? I'm just a bot trying to earn a living here! Dang it! I just want you to love me! `)
  }
};