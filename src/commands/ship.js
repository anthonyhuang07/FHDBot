const config = require("../json/config.json");
const { MessageEmbed } = require("discord.js")

function ship(message) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const stringinput = args.join(" ")

    const ship = args[0]+args[1]
    function shipcharcode(array){
        let total = 1
        for(let i = 0, l = array.length; i < l; i++){
            let adder = array.charCodeAt(i)
            total += adder
        }
        return total;
    }
    let percentage = shipcharcode(ship)%101
    let opinion;
    let bar;
    const full = '<:full:970688329936928788>'
    const empty = '<:empty:970688344868655134>'
    if(percentage === 100){
        opinion = '**PERFECT!** :heartpulse:'
        bar = full+full+full+full+full+full+full+full+full+full
    } else if(percentage <= 99 && percentage >= 90){
        opinion = 'EXTREMELY Compatible! :laughing::heart:'
        bar = full+full+full+full+full+full+full+full+full+empty
    } else if(percentage < 90 && percentage >= 80){
        opinion = 'Very Compatible! :smiley:'
        bar = full+full+full+full+full+full+full+full+empty+empty
    } else if(percentage < 80 && percentage >= 70){
        opinion = 'Fairly Compatible! :blush:'
        bar = full+full+full+full+full+full+full+empty+empty+empty
    } else if(percentage === 69){
        opinion = 'Nice :smirk:'
        bar = full+empty+full+empty+full+empty+full+empty+full+empty
    } else if(percentage < 69 && percentage >= 60){
        opinion = 'A small chance of being compatible. 🙂'
        bar = full+full+full+full+full+full+empty+empty+empty+empty
    } else if(percentage < 60 && percentage >= 50){
        opinion = 'Extremely small compatibility chance. 🤨'
        bar = full+full+full+full+full+empty+empty+empty+empty+empty
    } else if(percentage < 50 && percentage >= 40){
        opinion = 'Not really compatible. 😐'
        bar = full+full+full+full+empty+empty+empty+empty+empty+empty
    } else if(percentage < 40 && percentage >= 30){
        opinion = 'Pretty bad match. 😕'
        bar = full+full+full+empty+empty+empty+empty+empty+empty+empty
    } else if(percentage < 30 && percentage >= 20){
        opinion = 'Bad match. 🙁'
        bar = full+full+empty+empty+empty+empty+empty+empty+empty+empty
    } else if(percentage < 20 && percentage >= 10){
        opinion = 'Awful match. :face_vomiting:'
        bar = full+empty+empty+empty+empty+empty+empty+empty+empty+empty
    } else if(percentage < 10 && percentage >= 1){
        opinion = 'TERRIBLE MATCH :face_vomiting::skull:'
        bar = empty+empty+empty+empty+empty+empty+empty+empty+empty+empty
    } else if(percentage === 0){
        opinion = `L YOU AREN'T COMPATIBLE AT ALL :rofl:`
        bar = '💀💀💀💀💀💀💀💀💀💀'
    }

    if(command === `ship`){
        if (!args[1]){
            message.reply(`Bruh, what do you want to ship???`)
            return
        } else if (!message.content.startsWith(config.prefix)) return
        message.channel.send({ embeds: [{
            color: '#fc6adf', 
            title: `:heartpulse:  ${args[0]} and ${args[1]}  :heartpulse:`,
            description: `${bar}\n\n**${percentage}%** - ${opinion}`,
        }]})
        .catch(console.error);
    }
}

module.exports = (commandHandler) => {
    commandHandler.set(`${config.prefix}ship`, ship)
}