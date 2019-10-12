const discord = require('discord.js');
const client = new discord.Client();

const request = require('request');

var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser();

//file containing token
const auth = require('./auth.json');

var botInfo = require('./bot-info.json');

const bballNewsURL = 'https://www.espn.com/espn/rss/nba/news';


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.substring(0, 1) == '!') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                msg.reply('Pong!');
                break;
            case 'news':
                getRssFeed(bballNewsURL, msg.channel);
                break;
            // Just add any case commands if you want to..
         }
    }
});

var initialiseLastUpdated = function() {
    if(botInfo.lastUpdated == "") {
        //update lastUpdated timestamp
    }
};

var getRssFeed = function(url, channel) {
    // make request to get basketball feed
    var message = "", i, items;
    var keys;
    var date;
    var today = new Date();
    today.setDate(today.getDate() - 1);
    request(url, (err, res, body) => {
        if(err) { return console.log('error: ' + err); }

        if(res.statusCode === 200) {
            xmlParser.parseString(body, function(err, result) {
                items = result.rss.channel[0].item;
    
                for(i=0; i < items.length; i++){
                    //console.log (items[i].pubDate)
                    date = new Date(items[i].pubDate);
                    if (date >= today) {
                        message += items[i].title;
                        message += items[i].link  + "\n";
                        channel.send(message);
                    }
    
    
                } 
            });

            //update last update
            botInfo.lastLookUp = (new Date()).toDateString;
        }
        
    });
};

client.login(auth.token);