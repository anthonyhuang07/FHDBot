const config = require("../json/config.json");
const { MessageEmbed } = require("discord.js")

function eightBall(message) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    
    const eightBall = ['🟩 It is decidedly so.','🟥 My sources say no.','🟩 Signs point to yes.',"🟥 Don't count on it.",'🟩 Outlook good.','🟥 Outlook not so good.','🟩 Yes.','🟨 Reply hazy, try again.','🟩 It is certain.','🟨 Better not tell you now.','🟥 My reply is no.','🟨 Concentrate and ask again.','🟥 Very doubtful.']
    if (!args[0]){
        message.reply(`Uh... What's your question???`)
        return
    } else{
        message.reply(eightBall[Math.floor(Math.random() * eightBall.length)])
    }
}

module.exports = (commandHandler) => {
    commandHandler.set(`${config.prefix}8ball`, eightBall)
}