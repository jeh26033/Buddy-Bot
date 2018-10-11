console.log('hello from the watcher module!');
const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = async()=>{

var Snooper = require('reddit-snooper')


 
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
           
    	

        console.log(chalk.red(post.data.author));
        console.log(post.data.url)
        return postEmbed;
        //console.log(post.data)

        if (post.data.author==='SirBelvedere' || post.data.author==='wykrhm' || post.data.author==='Magesunite' || post.data.author ==='synysterjoe' ) {
          console.log(chalk.red('we got one!'));
          
        }

      }//try 
      	catch(error){
        console.error(error);
        }      

  
 
      });
  
}