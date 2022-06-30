const config = require("../json/config.json");
const { MessageEmbed } = require("discord.js")

function pp(message) {
    const ppbar = ['You have no PP 🙁','8D','8=D','8==D','8===D','8====D','8=====D','8======D','8=======D','8========D','8=========D','8==========D','8===========D','8============D','8=============D','8==============D','8===============D','8================D','8=================D','8==================D','8===================D','8====================D']
    if(!message.mentions.members.size){
        message.channel.send({embeds:[{
            color: 'RANDOM',
            title: `PP Size Calculator`,
            description: `${message.author}'s pp size\n${ppbar[Math.floor(Math.random() * ppbar.length)]}`
        }]})
    } else{
        message.channel.send({embeds:[{
            color: 'RANDOM',
            title: `PP Size Calculator`,
            description: `${message.mentions.users.first()}'s pp size\n${ppbar[Math.floor(Math.random() * ppbar.length)]}`
        }]})
    }
}

function custompp(message) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    if(message.author.id === config.ownerid){
        message.delete().catch(console.error);
        message.channel.send({embeds:[{
            color: 'RANDOM',
            title: `PP Size Calculator`,
            description: `${message.author}'s pp size\n${args[0]}`
        }]}).catch(console.error);
    } else{
        message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
        return
    }
}

module.exports = (commandHandler) => {
    commandHandler.set(`${config.prefix}pp`, pp)
    commandHandler.set(`${config.prefix}custompp`, custompp)
}