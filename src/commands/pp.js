const config = require("../json/config.json");

exports.run = (client, message, args, command) => {
    const { Message, MessageEmbed } = require('discord.js');
    
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

exports.name = "pp";