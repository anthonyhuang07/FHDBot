const config = require("../json/config.json");

exports.run = (client, message, args, command) => {
    const { Message, MessageEmbed } = require('discord.js');
    
    const stackHelp = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Stack The Countries Help')
    .setDescription(`**What is stack the countries?**\n Stack the countries (by murding children) is an inside joke with a school server I was in. There's a mobile game called Stack The Countries, where you stack countries. I don't know why. Anyways, there's a channel in that school server called Stack the Countries screenshots, where people post Stack The Countries screenshots. I was bored one day and that channel was useless to me, so I just said a random statement, which was *stack the countries by murding children*. I spelled murdering wrong, which became murding, and I'm glad it came out that way, because now it's a weird inside joke.\n\n**How To Play:**\n To stack a country, use the ${config.prefix}stack command. This will give you 2 children to murd (not murder!). There is a 50/50 chance of one child being murded, but the other one won't get murded. If you choose the right child, you'll successfully stack a country, and your stack count will rise by 1. Or else, it will reduce by 1. It cannot reduce if the count is 0. There is a 1/5 chance for the stack to return to 0 when you fail a murd. The goal is to get the highest country stack.\n\n**Notes:**\n Country stacks are global, which means anyone can contribute to it. Somebody can stack a country, but another person can stack another country, making it 2 countries stacked. Return to 0s and failures will also count to the global stack.\n\n`)
    .setThumbnail('https://i.imgur.com/mU0RScm.png')
    .addFields(
        { name: 'Commands:', value: 
        `- Stack a country \`(${config.prefix}stack)\`\n- Stack Highscore \`(${config.prefix}stackhs OR ${config.prefix}stackhighscore)\`\n- Stack Help \`(${config.prefix}stackhelp)\`\n- Current Stack Score \`(${config.prefix}stackscore)\`\n- Current Stacked Countries \`(${config.prefix}stackedcountries)\``}
    )
    .setTimestamp()
    .setFooter({ text: 'FHDBot', iconURL: 'https://i.imgur.com/mU0RScm.png' });
    message.reply({ embeds: [stackHelp]})
}

exports.name = "stackhelp";