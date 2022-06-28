const config = require("../json/config.json");

exports.run = (client, message, args, command) => {
    const { Message, MessageEmbed } = require('discord.js');
    
    const ppbar = ['You have no PP 🙁','8D','8=D','8==D','8===D','8====D','8=====D','8======D','8=======D','8========D','8=========D','8==========D','8===========D','8============D','8=============D','8==============D','8===============D','8================D','8=================D','8==================D','8===================D','8====================D']
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

exports.name = "custompp";