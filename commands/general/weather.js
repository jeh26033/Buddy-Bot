const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');

module.exports = class WeatherCommand extends Command {
  constructor(bot) {
    super(bot, {
      name: 'weather',
      aliases: ['check-weather','temp','temp-outside','outside'],
      group: 'general',
      memberName: 'weather-check',
      description: 'checks the weather?',
      details: oneLine`
      need some weather?
			`,
      examples: ['weather']
    });
  }
//will this contain actual weather information one day? who knows.
  run(message) {
    let weatherString  = 
    `:sun_with_face: Its beautiful and sunny, 70 degrees
    :sweat_drops: It's raining, terrible. 50 degrees
    :cloud_rain: ITS RAINING SIDEWAYS, RUN
    :snow: it's snowing! go look! its cold!
    :thunder_cloud_rain: it's thunda stawm awt thar!
    go look for yourself.`
    let weatherList = weatherString.split('\n');
    
    weatherList = weatherList[Math.floor(Math.random() * weatherList.length)];
    message.channel.send(weatherList)
    
  }
};