console.log('hello from the watcher module!');
const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const client = new Discord.Client();
var Snooper = require('reddit-snooper')

const chalk = require('chalk');

 

function testWatcher(botlog,dotachannel){

  console.log('watcher ready')
  
  botlog.send('test watcher starting')
  snooper = new Snooper(
    {
        // credential information is not needed for snooper.watcher
        username: 'reddit_username',
        password: 'reddit password',
        app_id: 'reddit api app id',
        api_secret: 'reddit api secret',
        user_agent: 'OPTIONAL user agent for your bot',

        automatic_retries: true, // automatically handles condition when reddit says 'you are doing this too much'
        api_requests_per_minute: 30 // api requests will be spread out in order to play nicely with Reddit
    });
      
snooper.watcher.getPostWatcher('pics') 
    .on('post', function(post) {
    try{
        console.log('pics post title:' + post.data.title)
        console.log('pics post was posted by: ' + post.data.author)

              
        const postEmbed = new Discord.RichEmbed()

          .setURL(` ${post.data.url}`)
          .setTitle(`**${post.data.title}**`)
          .setAuthor(`${post.data.author}`)
          .addBlankField(true)
          .setColor('0x8a2be2')
          .setThumbnail(`https://pbs.twimg.com/profile_images/807755806837850112/WSFVeFeQ_400x400.jpg`)
          .setDescription(`${post.data.selftext}`)
          .setImage(`${post.data.url}`)
          .setTimestamp()
          
        botlog.send(postEmbed)

        console.log(chalk.red(post.data.author));
        console.log(post.data.url)
        //console.log(post.data)

        if (post.data.author==='SirBelvedere' || post.data.author==='wykrhm' || post.data.author==='Magesunite' || post.data.author ==='synysterjoe' ) {
          console.log(chalk.red('we got one!'));
          patchLog.send(postEmbed);
        }

      }//try
        catch(error){
        console.error(error);
      }//catch
    })
  
}



module.exports = testWatcher;
