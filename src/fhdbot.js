//#region (startup and imports)
require('dotenv').config()
const { Client, Intents, Collection, Message, MessageEmbed, MessageActionRow, MessageButton, MessageReaction, MessageAttachment, VoiceChannel } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, StreamType, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./json/config.json");
let highscore = require("./json/highscore.json");
let streak = require("./json/streak.json");
client.login(process.env.DISCORD_TOKEN)
client.on('ready', () => {
    console.log(`\x1B[31m███████╗██╗░░██╗██████╗░██████╗░░█████╗░████████╗\n\x1B[33m██╔════╝██║░░██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝\n\x1B[32m█████╗░░███████║██║░░██║██████╦╝██║░░██║░░░██║░░░\n\x1B[36m██╔══╝░░██╔══██║██║░░██║██╔══██╗██║░░██║░░░██║░░░\n\x1B[34m██║░░░░░██║░░██║██████╔╝██████╦╝╚█████╔╝░░░██║░░░\n\x1B[35m╚═╝░░░░░╚═╝░░╚═╝╚═════╝░╚═════╝░░╚════╝░░░░╚═╝░░░\n\x1B[0m${client.user.tag} has started up!\n`)    
    client.user.setActivity(`stacking countries by murding children`, { type: 'COMPETING', url: "https://www.twitch.tv/fhdhgngn" })
})
//#endregion
//#region (command handler)
client.commands = new Collection();

const events = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);
  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}
//#endregion
//#region (bot invited)
client.on('guildCreate', guild => {
    guild.systemChannel.send(`Hi, I'm FHDBot. Thanks for inviting me! You can find my commands by typing \`${config.prefix}help.\``)
    .catch(console.error);
});
//#endregion
client.on('messageCreate', (message) => {
    if(message.author.id === client.user.id) return;
    if(message.content === "<@963533621812158474>" || message.content.includes(`${config.prefix}help`)){
        const helpEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('FHDBot Help')
        .setDescription('The help menu for FHDBot.')
        .setThumbnail('https://i.imgur.com/mU0RScm.png')
        .addFields(
            { name: 'General', value: 
            `- Prefix \`(${config.prefix}prefix)\`\n- API Ping \`(${config.prefix}ping)\`\n- About FHDBot \`(${config.prefix}about)\`\n- Invite FHDBot \`(${config.prefix}invite)\`\n- Date/Time/Unix Timestamp \`(${config.prefix}time)\``},
            { name: 'Fun', value: 
            `- Shipping \`(${config.prefix}ship <arg1> <arg2>)\`\n- PP Size \`(${config.prefix}pp [user])\`\n- Who Asked? \`(${config.prefix}whoasked)\` OR \`(${config.prefix}wh0asked)\`\n- Magic 8 Ball \`(${config.prefix}8ball <question>)\`\n- Guess the Flag \`(${config.prefix}guess)\` | GTF Highscore \`(${config.prefix}guesshs OR ${config.prefix}guesshighscore)\`\n- Stack the Countries by Murding Children \`(${config.prefix}stackhelp)\``}
        )
        .setTimestamp()
        .setFooter({ text: 'FHDBot', iconURL: 'https://i.imgur.com/mU0RScm.png' });
        message.reply({ embeds: [helpEmbed]});
    }

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
client.on('messageCreate', (message) => { //commands not worth putting in seperate file
    if(message.author.id === client.user.id) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const stringinput = args.join(" ")

    if(command === `${config.prefix}guesshs` || command === `${config.prefix}guesshighscore`){
        message.reply(`The current high score for country guessing is **${streak.highscore} countries,** held by **${streak.record}.**`)
    }

    if(command === `${config.prefix}stackhs` || command === `${config.prefix}stackhighscore`){
        message.reply(`The current high score for country stacking is **${highscore.highscore} countries,** held by **${highscore.record}.**`)
    } else if(command === `${config.prefix}stackscore`){
        message.reply(`The current stack score is **${stackedCountries.highscore} countries.** Contribute to it with **${config.prefix}stack.**`)
    } else if(command === `${config.prefix}stackedcountries`){
        if(stackedCountryNames.length === 0){
            message.reply(`There are currently no stacked countries!`)
        } else{
            message.reply(`The stack currently includes **${stackedCountryNames.join(', ')}.**`)
        }
    }

    switch(command){    
        case `ban`:
            if (!message.content.startsWith(config.prefix)) return
            if(message.author.id === config.ownerid){
                let member = message.mentions.members.first();
                if(!member) return
                member.ban().then((member) => {
                    message.delete()
                }).catch(() => {
                    message.channel.send("I do not have permissions to do this!");
                });
            } else{
                message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
                return
            }
            break;
        case `nitro`:
            if(args[0].length < 10) return
            if(message.author.id === config.ownerid || message.author.id === "963533621812158474"){
                try{
                    client.users.fetch(`${args[0]}`, false).then((user) => {
                        user.send({embeds: [{
                            color: '#fc6adf',
                            title: 'Click Here for Free Discord Nitro! (1 Year)',
                            url: 'https://anthonyhuang07.github.io/extras/error.html',
                            thumbnail: {url:"https://static.wikia.nocookie.net/discord/images/e/ea/Nitro.png/revision/latest?cb=20210105222501"},
                            description: 'This is your only opportunity. If you pass on this, you will not be gifted this opportunity ever again. Choose carefully.',
                            timestamp: Date.now()
                        }]}).then(console.log).catch(console.error);
                    });
                    message.delete().then(console.log).catch(console.error);
                } catch (error){
                    console.error();
                }
            } else{
                message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
                return
            }
            break;
        case `spam`:
            if(args[0].length < 10) return
            let pingCount = 0;
            if(message.author.id === config.ownerid){
                spamming = true;
                function spammer(){
                    if(spamming){
                        if(!spamming) return;
                        client.users.fetch(`${args[0]}`, false).then((user) => {
                            user.send(stringinput).catch(console.error);
                            pingCount++;
                            console.log('SPAMMING: ' + user.tag + ', PING: ' + pingCount)
                        }).catch(console.error);
                        setTimeout(spammer, 1000);
                    } else{
                        return;
                    }
                }
                spammer();
            } else{
                message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
                return
            }
            break;
        case `say`:
            if (!message.content.startsWith(config.prefix)) return
            if(message.author.id === config.ownerid){
                message.delete().then(console.log).catch(console.error);
                message.channel.send(stringinput).then(console.log).catch(console.error);
            } else{
                message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
                return
            }
            break;
        case `embedsay`:
            if (!message.content.startsWith(config.prefix)) return
            if(message.author.id === config.ownerid){
                message.delete()
                .then(console.log)
                .catch(console.error);
                message.channel.send({embeds: [{color: 'RANDOM', title: stringinput}]})
                .then(console.log)
                .catch(console.error);
            } else{
                message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
                return
            }
            break;
    }

    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    const aboutme = new MessageEmbed()
    .setColor('RANDOM') 
    .setTitle('About FHDBot')
    .setDescription(`Creator: <@${config.ownerid}>\nUptime: ${uptime}\n[Source Code](https://github.com/anthonyhuang07/FHDBot)\n[Bot Token](https://www.youtube.com/watch?v=oHg5SJYRHA0)`)
    .setThumbnail('https://i.imgur.com/mU0RScm.png')
    .setFooter({ text: `Made with discord.js v13`, iconURL: `https://i.imgur.com/CLXNXbU.png` });
    switch(command){
        case `${config.prefix}prefix`:
            message.reply(`The prefix is \`${config.prefix}\`.`)
            break;
        case `${config.prefix}ping`:
            message.reply(`**Pong!** 🏓\nAPI Latency: \`${Math.round(client.ws.ping)}ms\``)
            break;
        case `${config.prefix}about`:
            message.channel.send({ embeds: [aboutme] })
            break;
        case `${config.prefix}whoasked`:
            message.channel.send(`Finding Who Asked...`)
            setTimeout(() => {  message.channel.send(`✅ **Found!** ${message.author} Asked!`); }, 2000);
            break;
        case `${config.prefix}wh0asked`:
            message.channel.send(`Finding Who Asked...`)
            setTimeout(() => {  message.channel.send(`⛔ **ERROR:** Failed to find who asked.`); }, 2000);
            break;
        case `${config.prefix}invite`:
            message.channel.send({embeds: [{
                color: 'RANDOM', 
                thumbnail: {url:"https://i.imgur.com/mU0RScm.png"},
                title: 'Invite FHDBot!',
                description: '[✅ Default Invite](https://discord.com/api/oauth2/authorize?client_id=963533621812158474&permissions=388096&scope=bot)\n[⚠️ Administrator Permisions Invite](https://discord.com/api/oauth2/authorize?client_id=963533621812158474&permissions=8&scope=bot)',
                timestamp: new Date()
            }]})
            break;
        case `${config.prefix}time`:
            let current = new Date();
            message.channel.send(`Date and Time: \`${current.toLocaleString()}\`\nUnix Timestamp (ms): \`${Date.now()}\``)
            break;
    }
});