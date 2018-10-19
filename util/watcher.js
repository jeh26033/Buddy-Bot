console.log('hello from the watcher module!');
const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const client = new Discord.Client();
var Snooper = require('reddit-snooper')





 
client.on('ready', () => {
  console.log('watcher ready')
  const botlog= client.channels.find('name','bot-logs'); 
  const patchLog = client.channels.find('name','patchnotes')
  const artifact = client.channels.find('name', 'artifuckyeah')
  botlog.send('started up')
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

  //dota watcher
  snooper.watcher.getPostWatcher('dota2') 

    .on('post', function(post) {
    try{
        let selfText = post.data.selftext;
        if (selfText.length > 2000) {
          selfText= selfText.slice(0,2000).concat('...');
        }
        console.log('post title:' + post.data.title)
        console.log('post was posted by: ' + post.data.author) 
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
        botlog.send(postEmbed)
        console.log(chalk.red(post.data.author));
        console.log(chalk.red(post.data.url));
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

    //artifact watcher
    snooper.watcher.getPostWatcher('Artifact')
    
    .on('post', function(post) {
    try{
        let selfText = post.data.selftext;
        if (selfText.length > 2000) {
          selfText= selfText.slice(0,2000).concat('...');
        }
        console.log('post title:' + post.data.title)
        console.log('post was posted by: ' + post.data.author)

        const postEmbed = new Discord.RichEmbed()
          .setURL(` ${post.data.url}`)
          .setTitle(`**${post.data.title}**`)
          .setAuthor(`${post.data.author}`)
          .setColor('0x8a2be2')
          .setThumbnail(`http://mattdemers.com/wp-content/uploads/2017/08/valve_artifact_banner-945x500.png`)
          .setDescription(`${selfText}`)
          .setImage(`${post.data.url}`)
          .addBlankField(true)
          .setTimestamp()
        //sends to botlog
        botlog.send(postEmbed)

        console.log(chalk.red(post.data.author));
        console.log(post.data.url)

        //if poster is special, it posts to the primary channel.
        if (post.data.author==='SirBelvedere' || post.data.author==='wykrhm' || post.data.author==='Magesunite' || post.data.author ==='synysterjoe' ) {
          console.log(chalk.red('we got one!'));
          artifact.send(postEmbed);
        }
    }//try
      catch(e){
      }//catch
      process.on('unhandledRejection', err => {
        console.error(`"error": \n${err.stack}`);
      });

    })

//test watcher

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
  
// on ready 
});

