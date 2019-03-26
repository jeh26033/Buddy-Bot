const {Command} = require('discord.js-commando');
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed
const urlTestFeed = "http://blog.dota2.com/feed/";  
//var req = request('https://www.reddit.com/user/SirBelvedere/.rss')
    var myProductName = "feedParserDemo"; myVersion = "0.4.3";
var feedparser = new FeedParser;
module.exports = class RssCommanmd extends Command {
    constructor(client) {
        super(client, {
            name: 'rss',
            group: 'general',
            memberName: 'rss',
            description: 'Replies with a Message.',
            examples: ['reply'],


        });
    }
    run(msg) {
        
    
     
    function getFeed (urlfeed, callback) {

    var req = request (urlfeed);
    var feedparser = new FeedParser ();
    var feedItems = new Array ();
  req.on ("response", function (response) {
    var stream = this;
    if (response.statusCode == 200) {
      stream.pipe (feedparser);
      }
    });
  req.on ("error", function (err) {
    console.log ("getFeed: err.message == " + err.message);
    });
  feedparser.on ("readable", function () {
    try {
      var item = this.read (), flnew;
      if (item !== null) { //2/9/17 by DW
        feedItems.push (item);
        console.log(item)

        }
      }
    catch (err) {
      console.log ("getFeed: err.message == " + err.message);
      }
    });
  feedparser.on ("end", function () {
    callback (undefined, feedItems);
    });
  feedparser.on ("error", function (err) {
    console.log ("getFeed: err.message == " + err.message);
    callback (err);
    });
  }

console.log ("\n" + myProductName + " v" + myVersion + ".\n"); 
getFeed (urlTestFeed, function (err, feedItems) {
  console.log(feedItems.author);
  if (!err) {
    function pad (num) { 
      var s = num.toString (), ctplaces = 3;
      while (s.length < ctplaces) {
        s = "0" + s;
        }
      return (s);
      }
    console.log ("There are " + feedItems.length + " items in the feed.\n");
    msg.channel.send("There are " + feedItems.length + " items in the feed.\n")
    for (var i = 0; i < 1; i++) {
      
 
     
      msg.channel.send("Item #" + pad (i) + ": " + feedItems [i].title + ".\n")
      msg.channel.send("link #" + pad (i) + ": " + feedItems [i].link + ".\n")
      msg.channel.send("link #" + pad (i) + ": " + feedItems [i].description + ".\n")
 
      }
    }
  });
  }
};



