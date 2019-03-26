const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const client = new Discord.Client();
var Snooper = require('reddit-snooper')

const chalk = require('chalk');

 

function apexWatcher(botlog, apexlegends){

  console.log('apex watcher ready')
  
  botlog.send('apex Watcher starting up')
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
 snooper.watcher.getPostWatcher('apexlegends')
    
    .on('post', function(post) {
    try{
        let selfText = post.data.selftext;
        if (selfText.length > 2000) {
          selfText= selfText.slice(0,1800).concat('...');
        }
        const postEmbed = new Discord.RichEmbed()
          .setURL(` ${post.data.url}`)
          .setTitle(`**${post.data.title}**`)
          .setAuthor(`${post.data.author}`)
          .setColor('0x8a2be2')
          .setThumbnail(`https://b.thumbs.redditmedia.com/nYwrGmlhByEYtQT0hLt4Cem0cUM3I8-pAeET6lVAIik.png`)
          .setDescription(`${selfText}`)
          .setImage(`${post.data.url}`)
          .addBlankField(true)
          .setTimestamp()
          //console.log('new apex post'); 
          //bottesting.send(postEmbed);
        //if poster is special, it posts to the primary channel.
        if (post.data.author==='Jayfresh_Respawn') {
          console.log(chalk.red('we got one!'));
          apexlegends.send(postEmbed);
          apexlegends.send('@here')
        }
    }//try
      catch(e){
      }//catch
      process.on('unhandledRejection', err => {
        console.error(`"error": \n${err.stack}`);
      });

    })
    .on('error', console.error)
  
    
  }
module.exports = apexWatcher;
