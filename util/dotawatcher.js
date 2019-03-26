const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const client = new Discord.Client();
var Snooper = require('reddit-snooper')
const chalk = require('chalk');

 

function dotaWatcher(botlog,dotachannel){

  console.log('dota watcher ready')
  
  botlog.send('dota Watcher starting up')
  snooper = new Snooper(
    {
        // credential information is not needed for snooper.watcher
        username: 'reddit_username',
        password: 'reddit password',
        app_id: 'reddit api app id',
        api_secret: 'reddit api secret',
        user_agent: 'OPTIONAL user agent for your bot',

        automatic_retries: true, // automatically handles condition when reddit says 'you are doing this too much'
        api_requests_per_minute: 10 // api requests will be spread out in order to play nicely with Reddit
    });

  //dota watcher
  snooper.watcher.getPostWatcher('dota2') 

    .on('post', function(post) {
    try{
        let selfText = post.data.selftext;
        if (selfText.length > 2000) {
          selfText= selfText.slice(0,2000).concat('...');
        }

        const postEmbed = new Discord.RichEmbed()

          .setURL(` ${post.data.url}`)
          .setTitle(`**${post.data.title}**`)
          .setAuthor(`${post.data.author}`)
          .addBlankField(true)
          .setColor('0x8a2be2')
          .setThumbnail(`https://pbs.twimg.com/profile_images/807755806837850112/WSFVeFeQ_400x400.jpg`)
          .setDescription(`${selfText}`)
          .setImage(`${post.data.url}`)
          .setTimestamp()
        //botlog.send(postEmbed)
    
        //console.log(post.data)

        if (post.data.author==='SirBelvedere' || post.data.author==='wykrhm' || post.data.author==='Magesunite' || post.data.author ==='synysterjoe' ) {
          console.log(chalk.red('we got one!'));
          patchLog.send(postEmbed);
        }

      }//try
        catch (e) {

      }//catch
      process.on('unhandledRejection', err => {
        console.error(`"error": \n${err.stack}`);
      }); 
    })
     .on('error', console.error);

  }
module.exports = dotaWatcher;
