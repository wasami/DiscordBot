const discord = require('discord.js');
const client = new discord.Client();
const request = require('request');
const xml2js = require('xml2js');
const xmlParser = new xml2js.Parser();
const fs = require('fs');

//file containing token
const auth = require('./auth.json');

const bballNewsURL = 'https://www.espn.com/espn/rss/nba/news';
const botInfoFile = 'bot-info.json';

var botInfo, lastNewsFeedPostDate;

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

var initializeLastNewsFeedPostDate = function() {
    fs.readFile(botInfoFile, (err, data) => {
        if(err) throw err;
        botInfo = JSON.parse(data);

        if(botInfo.lastNewsFeedPostDate == "") {
            //set date when last posted news feed to be one ago 
            lastNewsFeedPostDate = new Date();
            lastNewsFeedPostDate.setDate(lastNewsFeedPostDate.getDate() - 1);
            console.log("No date found in file. New Date: " + lastNewsFeedPostDate.toDateString());
        }
        else {
            lastNewsFeedPostDate = new Date(botInfo.lastNewsFeedPostDate);
            console.log("Date found in File: " + lastNewsFeedPostDate.toDateString());
        }
    });
};

var getRssFeed = function(url, channel) {
    // make request to get basketball feed
    var message = "", i, items, date, data;

    request(url, (err, res, body) => {
        if(err) { return console.log('error: ' + err); }

        if(res.statusCode === 200) {
            xmlParser.parseString(body, function(err, result) {
                items = result.rss.channel[0].item;
    
                for(i=0; i < items.length; i++){
                    //console.log (items[i].pubDate)
                    date = new Date(items[i].pubDate);
                    if (date >= lastNewsFeedPostDate) {
                        message += items[i].title + " ";
                        message += items[i].link  + "\n";
                        channel.send(message);
                    }
                }
            });

            //update last news feed post date
            botInfo.lastNewsFeedPostDate = (new Date()).toDateString();
            //write back to file
            data = JSON.stringify(botInfo, null, 2);
            fs.writeFileSync(botInfoFile, data);
        }
    });
};

initializeLastNewsFeedPostDate();

client.login(auth.token);

