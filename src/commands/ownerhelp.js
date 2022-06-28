const config = require("../json/config.json");

exports.run = (client, message, args, command) => {
    const { Message, MessageEmbed } = require('discord.js');
    
    if(message.author.id === config.ownerid){
        const ownerHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('FHDBot Help (Owner)')
        .setDescription('The help menu for FHDBot. (Owner Commands)')
        .setThumbnail('https://i.imgur.com/mU0RScm.png')
        .addFields(
            { name: 'General', value: 
            `- Say Something \`(${config.prefix}say <string>)\`\n- Say Something in an Embed \`(${config.prefix}embedsay <string>)\`\n- Join Current VC \`(${config.prefix}join)\`\n- Spam Someone \`(${config.prefix}spam <id>)\`\n- Stop Running Processes \`(${config.prefix}stop)\``},
            { name: 'Fun', value: 
            `- Custom PP Size \`(${config.prefix}custompp <args>)\`\n- Free Nitro \`(${config.prefix}nitro <@user>)\``}
        )
        .setTimestamp()
        .setFooter({ text: 'FHDBot', iconURL: 'https://i.imgur.com/mU0RScm.png' });
        message.reply({ embeds: [ownerHelp]})
    } else{
        message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
        return
    }
}

exports.name = "ownerhelp";