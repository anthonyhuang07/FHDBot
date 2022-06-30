//#region (startup and imports)
require('dotenv').config()
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./json/config.json");
client.login(process.env.DISCORD_TOKEN)
client.on('ready', () => {
    console.log(`\x1B[31m███████╗██╗░░██╗██████╗░██████╗░░█████╗░████████╗\n\x1B[33m██╔════╝██║░░██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝\n\x1B[32m█████╗░░███████║██║░░██║██████╦╝██║░░██║░░░██║░░░\n\x1B[36m██╔══╝░░██╔══██║██║░░██║██╔══██╗██║░░██║░░░██║░░░\n\x1B[34m██║░░░░░██║░░██║██████╔╝██████╦╝╚█████╔╝░░░██║░░░\n\x1B[35m╚═╝░░░░░╚═╝░░╚═╝╚═════╝░╚═════╝░░╚════╝░░░░╚═╝░░░\n\x1B[0m${client.user.tag} has started up!\n`)    
    client.user.setActivity(`UNDER CONSTRUCTION`, { type: 'STREAMING', url: "https://www.twitch.tv/fhdhgngn" })
})
//#endregion
//#region (command handler [VERY BAD])
const ship = require("./commands/ship.js")
const help = require("./commands/help.js")
const pp = require("./commands/pp.js")
const eightBall = require("./commands/8ball.js")
const guess = require("./commands/guess.js")
const commandHandler = new Map();
ship(commandHandler); 
help(commandHandler);
pp(commandHandler);
eightBall(commandHandler);
guess.registerCommands(commandHandler);
//#endregion
//#region (bot invited)
client.on('guildCreate', guild => {
    guild.systemChannel.send(`Hi, I'm FHDBot. Thanks for inviting me! You can find my commands by typing \`${config.prefix}help.\``)
    .catch(console.error);
});
//#endregion
client.on('messageCreate', (message) => { //normal commands
    if(message.author.id === client.user.id) return;
    if (message.content.indexOf(config.prefix) !== 0) {
        if (guess.isGuessingCountry()) {
            guess.handleGuessing(message)
        }
    }
    
    const handler = commandHandler.get(message.content.split(" ")[0])
    if (handler !== undefined){
        handler(message);
    }
})
client.on('messageCreate', (message) => { // passive responses (no command)
    function getRandomItem(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const item = arr[randomIndex];
        return item;
    }

    let words = ['ratio', 'can pooper', 'bozo']
    let randomNumber = Math.floor(Math.random() * 21);

    for (let i = 0; i < words.length; i++) {
        if (message.content.toLowerCase().includes(words[i])) {
          if(message.author.id === "628672513345454122" || message.author.id === "963533621812158474") return;
          message.reply('shut up bozo')
          message.react("🤡").catch(console.error); message.react("🤓").catch(console.error);
          break;
        }
    }

    if(message.content.toLowerCase().includes('your')){
        randomNumber = Math.floor(Math.random() * 6);
        console.log('Your detector: ' + randomNumber)
        if(randomNumber === 0){
            message.reply("you're*")
        }
    } else if(message.content.toLowerCase() === 'who'){
        randomNumber = Math.floor(Math.random() * 4);
        console.log('Who asked detector: ' + randomNumber)
        if(randomNumber === 0){
            message.reply("asked")
        }
        if(randomNumber === 1){
            message.reply("cares")
        }
    } else if(message.content.toLowerCase() === 'what'){
        randomNumber = Math.floor(Math.random() * 2);
        console.log('What ever detector: ' + randomNumber)
        if(randomNumber === 0){
            message.reply("ever").catch(console.error)
        }
    }
});