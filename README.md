# Ball Is Life
A Discord bot dedicated to giving live updated on the latest news from the NBA. Source comes from ESPN.

## Run the bot for yourself
Below you will find detailed instructions on how to run this bot for yourself.

### Install Node.js and create a Discord account if you don't have one already
Download and install [Node.js](https://nodejs.org/en/) before anything else if you don't already have it installed. 
First you're going to need a [Discord](https://discordapp.com/) account and login to discord either through the browser or the app if you have it installed.
Then once you have a Discord account, login and create your own server!

### Create your own bot
Head over to [Discords developer portal](https://discordapp.com/developers/applications/) and create a new application. 
Then navigate to the Bot setting page and create a bot.

### Add your bot to your server
To do this you are going to need to put the URL below into your browser but replace 'YOUR_CLIENT_ID' with your client ID for your discord app.
You can get your applications client ID from the general information page 
```
https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID&scope=bot&permissions=8
```
This will take you to a page where you can tell Discord where to take your bot. Add the bot to the server you created earlier.

### Fork the repository
Now your going to need to do a couple more things than just forking this repo and running the bot.
First fork this repo.
Then, go to the repo and create a JSON file and name it 'auth.json'. Then add the following to the file
```
{
    "token": "YOUR_TOKEN_HERE"
}
```
Go to the bot page again on the Discord developer portal and get your token from there, replace it with 'YOUR_TOKEN_HERE' and save the file.

Finally open up a command line, go to the repo and install the node dependencies by using this command
```
npm install
```
### Run the bot
Hopefully, by this point you have carried out the necessary steps to run the bot yourself. All that is left is execute this command
```
node bot.js
```
After this you should see the message on your console 'Logged in as [your_bot_name]#0000!' and tada! The bot is live.

## How to use the bot
Currently the bot is not automated yet and the only way to interact with the bot is by sending a message to the server the bot joined.
The only commands the bot recognises so far is '!ping' and '!news'. Try it and see what happens!
