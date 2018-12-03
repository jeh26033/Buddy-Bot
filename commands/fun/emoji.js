const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const translate = require('moji-translate');
var Emojify = require("@gaikema/emojify");

module.exports = class FedCommand extends Command {
  constructor(bot) {
    super(bot, {
      name: 'emojify',
      aliases: ['emoji', 'emoticon'],
      group: 'fun',
      memberName: 'emojify',
      description: 'Translates your words into emoji',
      details: oneLine`
      It's a modern language.
			`,
      examples: ['emojify'],
       args:[
                {
                    key:'string',
                    prompt:'What do you want to translate',
                    type:'string'
                }
            ]
    });
  }

  run(message, args) {
//console.log(translate.translate('👀'));
//console.log(translate.translate("the house is on fire and the cat is eating the cake"));
 const EMOJI_MAP = {
  0: ":zero:", 1: ":one:", 2: ":two:", 3: ":three:", 4: ":four:", 5: ":five:",
  6: ":six:", 7: ":seven:", 8: ":eight:", 9: ":nine:", 10: ":keycap_ten:",
  "?": ":question:",
  "!": ":exclamation:",
  "+": ":heavy_plus_sign:",
  "-": ":heavy_minus_sign:",
  "%": ":heavy_division_sign:",
  "$": ":heavy_dollar_sign:",
};

const initialEmoji = translate.translate(args.string)

function emoji_poop(args){
  const words = args.split(/\b/).map(
    word => word.split(``).map(v => /[a-z]/i.test(v)?`:regional_indicator_${v.toLowerCase()}:`:EMOJI_MAP[v]||v).join` `
  );
  console.log(words)
  const blocks = [];
  let currentBlock = [];
  words.forEach(word => {
    if ([...currentBlock, word].join` `.length >= 2000) {
      blocks.push(currentBlock.join` `);
      currentBlock = [];
    }
    currentBlock.push(word);
  });
  return [...blocks, currentBlock.join` `];
}
  
  
  //var emojifyTest = new Emojify.Emojify(initialEmoji);
  // console.log(emojifyTest.emojify());
  message.channel.send(emoji_poop(args.string));
  }
};