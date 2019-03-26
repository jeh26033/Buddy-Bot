console.log('hello from the stalker module!');
const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const {Command} = require('discord.js-commando');
const commando = require('discord.js-commando');
const client = new Discord.Client();
var Snooper = require('reddit-snooper')

const chalk = require('chalk');

function setStalker(bool) {
  if (bool) {
    
    console.log(`stalker setting: ${stalker}`)
    return stalker=true;
  }else{
    return stalker=false;
  }
    console.log('setting falseness');
}
   
module.exports = setStalker;