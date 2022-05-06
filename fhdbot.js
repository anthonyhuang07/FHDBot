//#region (startup and variables)
require('dotenv').config()
const { Client, Intents, Message, MessageEmbed, MessageActionRow, MessageButton, MessageReaction, MessageAttachment } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");
client.login(process.env.DISCORD_TOKEN)
client.on('ready', () => {
    console.log(`\x1B[31m███████╗██╗░░██╗██████╗░██████╗░░█████╗░████████╗\n\x1B[33m██╔════╝██║░░██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝\n\x1B[32m█████╗░░███████║██║░░██║██████╦╝██║░░██║░░░██║░░░\n\x1B[36m██╔══╝░░██╔══██║██║░░██║██╔══██╗██║░░██║░░░██║░░░\n\x1B[34m██║░░░░░██║░░██║██████╔╝██████╦╝╚█████╔╝░░░██║░░░\n\x1B[35m╚═╝░░░░░╚═╝░░╚═╝╚═════╝░╚═════╝░░╚════╝░░░░╚═╝░░░\n\x1B[0m${client.user.tag} has started up!\n`)
    client.user.setActivity(`can pooper MUKBANG`, { type: 'STREAMING', url: "https://www.twitch.tv/fhdhgngn" })
})
//#endregion
//#region (bot invited)
client.on('guildCreate', guild => {
    guild.systemChannel.send(`Hi, I'm FHDBot. Thanks for inviting me! You can find my commands by typing ${config.prefix}help.`)
    .then(console.log)
    .catch(console.error);
});
//#endregion
//#region (messageCreate)
client.on('messageCreate', (message) => {
    //#region (variables)
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = message.content.toLowerCase();
    const cmdwithargs = args.shift().toLowerCase();
    const stringinput = args.join(" ")
    //#endregion
    //#region (help menus)
    if(command === `${config.prefix}help` || message.content === `<@963533621812158474>`){
        const helpEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('FHDBot Help')
        .setDescription('The help menu for FHDBot.')
        .setThumbnail('https://i.imgur.com/mERBq3H.jpg')
        .addFields(
            { name: 'General', value: 
            `- Prefix \`(${config.prefix}prefix)\`\n- Message Send & API Ping \`(${config.prefix}ping)\`\n- About FHDBot \`(${config.prefix}about)\`\n- Invite FHDBot \`(${config.prefix}invite)\`\n- Date/Time/Unix Timestamp \`(${config.prefix}time)\``},
            { name: 'Fun', value: 
            `- Copypastas \`(${config.prefix}copypasta)\`\n- Shipping \`(${config.prefix}ship <arg1> <arg2>)\`\n- Random Video (Under 2 Minutes) \`(${config.prefix}video)\`\n- PP Size \`(${config.prefix}pp [user])\`\n- Who Asked? \`(${config.prefix}whoasked)\` OR \`(${config.prefix}wh0asked)\`\n- Magic 8 Ball \`(${config.prefix}8ball <question>)\`\n- Kirby's Return to Discord \`(${config.prefix}kirby)\` (UNFINISHED)`}
        )
        .setTimestamp()
        .setFooter({ text: 'FHDBot', iconURL: 'https://i.imgur.com/mERBq3H.jpg' });
        message.reply({ embeds: [helpEmbed]});

    } 
    
    if(command === `${config.prefix}ownerhelp`){
        if (!message.content.startsWith(config.prefix)) return
        if(message.author.id === config.ownerid){
            const ownerHelp = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('FHDBot Help (Owner)')
            .setDescription('The help menu for FHDBot. (Owner Commands)')
            .setThumbnail('https://i.imgur.com/mERBq3H.jpg')
            .addFields(
                { name: 'General', value: 
                `- Say Something \`(${config.prefix}say <string>)\`\n- Say Something in an Embed \`(${config.prefix}embedsay <string>)\``},
                { name: 'Fun', value: 
                `- Custom PP Size \`(${config.prefix}custompp <args>)\`\n- Free Nitro \`(${config.prefix}nitro <@user>)\``}
            )
            .setTimestamp()
            .setFooter({ text: 'FHDBot', iconURL: 'https://i.imgur.com/mERBq3H.jpg' });
            message.reply({ embeds: [ownerHelp]})

        } else{
            message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
            return
        }
    }
    
    if(command === `${config.prefix}copypasta`){
        const copypastaHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Copypastas')
        .setDescription(`A list of Copypastas to use.`)
        .addFields(
            { name: 'Copypastas:', value: `- Stop Posting About Among Us \`(${config.prefix}copypasta amogus)\`\n- Aditya \`(${config.prefix}copypasta aditya)\`\n- The Letter A \`(${config.prefix}copypasta a)\`\n- MEE6 Death \`(${config.prefix}copypasta mee6)\``}
        )
        message.reply({embeds: [copypastaHelp]});
    }

    //#endregion
    //#region (copypastas)
    const copypastas = [`${config.prefix}copypasta amogus`,`${config.prefix}copypasta aditya`,`${config.prefix}copypasta a`,`${config.prefix}copypasta mee6`]
    switch(command){    
        case copypastas[0]:
            message.channel.send(`STOP POSTING ABOUT AMONG US! I'M TIRED OF SEEING IT! MY FRIENDS ON TIKTOK SEND ME MEMES, ON DISCORD IT'S FUCKING MEMES! I was in a server, right? and ALL OF THE CHANNELS were just among us stuff. I-I showed my champion underwear to my girlfriend and t-the logo I flipped it and I said "hey babe, when the underwear is sus HAHA DING DING DING DING DING DING DING DI DI DING" I fucking looked at a trashcan and said "THAT'S A BIT SUSSY" I looked at my penis I think of an astronauts helmet and I go "PENIS? MORE LIKE PENSUS" AAAAAAAAAAAAAAHGESFG`)
            break;
        case copypastas[1]:
            message.channel.send(`1) are you stupid? (not really a question)\n2) I wasn't asking just you, noone cares about you i just put it there cause its funny\n3) Your not cool by saying "L+bozo+ratio..." so shut up\n4) Because you act like a idiot thinking oh ok hes just talking to me and not the other 40+(or smth) in the server\n5) Noone cares, you are not smart by correcting\n6) You are not smart by trying to correct someone\n7) how stupid are you? if you are going to do a copypasta atleast number it correct`)
            break;
        case copypastas[2]:
            message.channel.send(`You thought you just did something there didn't you? Well sorry to burst your bubble, but numerous sentences could be constructed without the use of the first letter of the English lexicon.`)
            break;
        case copypastas[3]:
            message.channel.send(`<@159985870458322944>, I will disassemble your molecular structure and combust your atoms, but not before i rip you from limb to limb, snap your fingers like a kitkat, and incinerate your organs.  I will pour sodium hydroxide into your veins and feed your leg muscles into a meat grinder. To finish it off, I will throw your hair to the rats in my attic and let your nits and dandruff decompose.`);
    }
    //#endregion
    //#region (shipping)
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
    const towny = ['Tony','tony','Toeknee','toeknee','despotato#7521','TOEKNEE','TONY','Towny','towny','<@776445269155643392>']
    const kasuh = ['Cassia','cassia','KaseUH','kaseuh','boyo#6859','KASEUH','CASSIA','UwU','Chair','Nobody','KasUH','kasuh','Kasuh','nobody','chair','<@767861703303626783>']
    const stuffs = ['Everyone','Mia','mia','Smart','Tall','tall']
    for(let i = 0; i < towny.length; i++){
        if (args[0] === towny[i] || args[1] === towny[i]){
            for(let j = 0; j < kasuh.length; j++){
                if (args[0] === kasuh[j] || args[1] === kasuh[j]){
                    percentage = 100;
                    break;
                }
            }
        }
    } for(let i = 0; i < towny.length; i++){
        if (args[0] === towny[i] || args[1] === towny[i]){
            for(let j = 0; j < stuffs.length; j++){
                if (args[0] === stuffs[j] || args[1] === stuffs[j]){
                    percentage = 0;
                    break;
                }
            }
        }
    }
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

    if(cmdwithargs === `ship`){
        if (!args[1]){
            message.reply(`Bruh, what do you want to ship???`)
            return
        } 
        if (!message.content.startsWith(config.prefix)) return
        message.channel.send({ embeds: [{
            color: '#fc6adf', 
            title: `:heartpulse:  ${args[0]} and ${args[1]}  :heartpulse:`,
            description: `${bar}\n\n**${percentage}%** - ${opinion}`,
        }]})
        .then(console.log)
        .catch(console.error);
    }
    //#endregion
    //#region (random video)
    const videos = [
        'https://www.youtube.com/watch?v=PZ_d2O5ZT2c', 
        'https://www.youtube.com/watch?v=-Lud_GLfwR8',
        'https://www.youtube.com/watch?v=mJLTvxUhlqo',
        'https://www.youtube.com/watch?v=ZBDRIy4X2sU',
        'https://www.youtube.com/watch?v=dce3bWOkXTA',
        'https://www.youtube.com/watch?v=4ouXNzRkh40',
        'https://www.youtube.com/watch?v=3P3GVnN70u0',
        'https://www.youtube.com/watch?v=0XmglBlOhUw',
        'https://www.youtube.com/watch?v=uRiGdl_fD28',
        'https://www.youtube.com/watch?v=GvhkSw-ppA0',
        'https://www.youtube.com/watch?v=OD8HS7kC_oo',
        'https://www.youtube.com/watch?v=T6_0o4MU6Pw',
        'https://www.youtube.com/watch?v=Mly-ptUD7M8',
        'https://www.youtube.com/watch?v=u25WXLlZGAQ',
        'https://www.youtube.com/watch?v=ZIF_c0e22Bw',
        'https://www.youtube.com/watch?v=w_dbFNWD910',
        'https://www.youtube.com/watch?v=Nrk8sqZfsgI',
        'https://www.youtube.com/watch?v=0PDOub2hUvM',
        'https://www.youtube.com/watch?v=3oBdfIHXcyM',
        'https://www.youtube.com/watch?v=5RzHEQlS5_M',
        'https://www.youtube.com/watch?v=Cm8k5h12VnI',
        'https://www.youtube.com/watch?v=3Uk6-iiVb0Y',
        'https://www.youtube.com/watch?v=r3NHXbM9HH8',
        'https://www.youtube.com/watch?v=rJxl5mWWmGU',
        'https://www.youtube.com/watch?v=GEhEUy85PsY',
        'https://www.youtube.com/watch?v=e1E9PysyEXU',
        'https://www.youtube.com/watch?v=oYoZj87CdTg',
        'https://www.youtube.com/watch?v=jSD3vrR2HxI',
        'https://www.youtube.com/watch?v=XbqT2pLEl_8',
        'https://www.youtube.com/watch?v=srAg1j3tVfI',
        'https://www.youtube.com/watch?v=2VC9xHCNf-I',
        'https://www.youtube.com/watch?v=8sNekrl9x9g',
        'https://www.youtube.com/watch?v=LNL6t-Eu-IY',
        'https://www.youtube.com/watch?v=ROm4SMaEOLY',
        'https://www.youtube.com/watch?v=RD_5Kdjvz4Q',
    ];
    if(command === `${config.prefix}video`){
        message.channel.send(videos[Math.floor(Math.random() * videos.length)])
    }
    //#endregion
    //#region (pp size)
    const ppbar = ['You have no PP 🙁','8D','8=D','8==D','8===D','8====D','8=====D','8======D','8=======D','8========D','8=========D','8==========D','8===========D','8============D','8=============D','8==============D','8===============D','8================D','8=================D','8==================D','8===================D','8====================D']
    if(command.startsWith(`${config.prefix}pp`)){
        if(message.author.id === '562859377816633372'){
            message.channel.send(`Sorry, but you don't have a PP!`);
            return
        }
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
    if(cmdwithargs === `custompp`){
        if (!message.content.startsWith(config.prefix)) return
        if(message.author.id === config.ownerid){
            message.delete()
            .then(console.log)
            .catch(console.error);
            message.channel.send({embeds:[{
                color: 'RANDOM',
                title: `PP Size Calculator`,
                description: `${message.author}'s pp size\n${args[0]}`
            }]})
            .then(console.log)
            .catch(console.error);
        } else{
            message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
            return
        }
    }
    //#endregion
    //#region (8ball)
    const eightBall = ['🟩 It is decidedly so.','🟥 My sources say no.','🟩 Signs point to yes.',"🟥 Don't count on it.",'🟩 Outlook good.','🟥 Outlook not so good.','🟩 Yes.','🟨 Reply hazy, try again.','🟩 It is certain.','🟨 Better not tell you now.','🟥 My reply is no.','🟨 Concentrate and ask again.','🟥 Very doubtful.']
    if(cmdwithargs === `8ball`)
    if (!args[0]){
        message.reply(`Uh... What's your question???`)
        return
    } else{
        message.reply(eightBall[Math.floor(Math.random() * eightBall.length)])
    }

    //#endregion
    //#region (game)
    const playexit = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('play')
            .setLabel('Yes')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setCustomId('exit')
            .setLabel('No')
            .setStyle('DANGER'),
    );
    const moveset1 = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('swallow1')
            .setLabel('Swallow')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('attack1')
            .setLabel('Attack')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('flee')
            .setLabel('Flee')
            .setStyle('DANGER'),
    );
    const moveset1point1 = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('swallow1point1')
            .setLabel('Swallow')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('attack1point1')
            .setLabel('Attack')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('flee')
            .setLabel('Flee')
            .setStyle('DANGER'),
    );
    const moveset2 = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('drop2')
            .setLabel('Drop Ability')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('attack2')
            .setLabel('Attack')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('flee')
            .setLabel('Flee')
            .setStyle('DANGER'),
    );
    const keytron = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('wrong')
            .setLabel('3')
            .setStyle('DANGER'),
        new MessageButton()
            .setCustomId('wrong2')
            .setLabel('8')
            .setStyle('DANGER'),
        new MessageButton()
            .setCustomId('correct')
            .setLabel('5')
            .setStyle('DANGER'),
    );
    const keyyn = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('yesplz')
            .setLabel('Yes')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setCustomId('nosir')
            .setLabel('No')
            .setStyle('DANGER'),
    );
    const ultrasword = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('swallowultra')
            .setLabel('Swallow')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('attackultra')
            .setLabel('Attack')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('flee')
            .setLabel('Flee')
            .setStyle('DANGER'),
    );
    const ultramoveset = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('cut')
            .setLabel('Slash')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('fly')
            .setLabel('Fly Over')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('flee')
            .setLabel('Flee')
            .setStyle('DANGER'),
    );
    const flyonly = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('fly')
            .setLabel('Fly Over')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('attackfail')
            .setLabel('Attack')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('flee')
            .setLabel('Flee')
            .setStyle('DANGER'),
    );
    const yesnohellno = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('yesportal')
            .setLabel('Fly Over')
            .setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('noportal')
            .setLabel('Attack')
            .setStyle('PRIMARY'),
    );
    
    let energyspheres = 0;
    if(message.content.toLowerCase() === `${config.prefix}kirby`){
        energyspheres = 0
        const kirby = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Would you like to play Kirby's Return to Discord?")
        .setImage("https://upload.wikimedia.org/wikipedia/sco/5/5c/Kirby.png")
        message.reply({ embeds: [kirby], components: [playexit] });
    }

    client.on('interactionCreate', async ButtonInteraction => {
        if(!ButtonInteraction.isButton()) return
        switch(ButtonInteraction.customId){
            case 'exit':
                const goodbyekirby = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Goodbye!")
                .setImage("https://snipstock.com/assets/cdn/png/new/97f516522e48846345a6bf37cce4985a.png")
                await ButtonInteraction.update({ embeds: [goodbyekirby], components: [] })
                break;
            case 'play':
                const kirby1 = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("World 1-1")
                .setImage('https://static.wikia.nocookie.net/kirby/images/b/bf/KSA_Blade_Knight_artwork.png/revision/latest?cb=20180403180249&path-prefix=en')
                .setDescription("You see a Blade Knight. What do you do?\n")
                await ButtonInteraction.update({ embeds: [kirby1], components: [moveset1] })
                .then(console.log)
                .catch(console.error)
                break;
            case 'flee':
                const fled = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You fled! (What a wimp...)")
                .setImage("https://www.gameclimate.com/wp-content/uploads/2011/08/i_30453.png")
                await ButtonInteraction.update({ embeds: [fled], components: [] })
                break;
            case 'swallow1':
                const kirby2 = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You are now Sword Kirby!")
                .setImage('https://cdn.wikirby.com/thumb/6/67/KatFL_Waddle_Dee_artwork.png/300px-KatFL_Waddle_Dee_artwork.png')
                .setDescription("You see a bunch of Waddle Dees. What do you do?\n")
                await ButtonInteraction.update({ embeds: [kirby2], components: [moveset2] })
                break;
            case 'attack1':
                const kirby1attack = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You killed the blade knight!")
                .setImage('https://cdn.wikirby.com/thumb/6/67/KatFL_Waddle_Dee_artwork.png/300px-KatFL_Waddle_Dee_artwork.png')
                .setDescription("You see a bunch of Waddle Dees. What do you do?\n")
                await ButtonInteraction.update({ embeds: [kirby1attack], components: [moveset1point1] })
                break;
            case 'attack1point1':
                const kirbydeath1point1 = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You Died!")
                .setImage('https://i.ytimg.com/vi/-G-AuLXhTN4/mqdefault.jpg')
                .setDescription(`You tried to attack, but the Waddle Dees overpowered you!\n\nType ${config.prefix}kirby to restart the game!`)
                await ButtonInteraction.update({ embeds: [kirbydeath1point1], components: [] })
                break;
            case 'swallow1point1':
                const kirbeasy = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You swallowed every Waddle Dee! It had no effect.")
                .setImage('https://static.wikia.nocookie.net/kirby/images/4/4b/TutorialIllustCA01.tpl.png/revision/latest/scale-to-width/360?cb=20180721174224&path-prefix=en')
                .setDescription("You see a key. Do you grab it?\n")
                await ButtonInteraction.update({ embeds: [kirbeasy], components: [keyyn] })
                break;
            case 'drop2':
                const kirbydeath2 = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You Died!")
                .setImage('https://i.ytimg.com/vi/-G-AuLXhTN4/mqdefault.jpg')
                .setDescription(`You dropped your Sword ability and the group of Waddle Dees ran over you!\n\nType ${config.prefix}kirby to restart the game!`)
                await ButtonInteraction.update({ embeds: [kirbydeath2], components: [] })
                break;
            case 'attack2':
                const kirbyattack2 = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You plowed through the Waddle Dees!")
                .setImage('https://static.wikia.nocookie.net/kirby/images/4/4b/TutorialIllustCA01.tpl.png/revision/latest/scale-to-width/360?cb=20180721174224&path-prefix=en')
                .setDescription("You see a key. Do you grab it?\n")
                await ButtonInteraction.update({ embeds: [kirbyattack2], components: [keyyn] })
                break;
            case 'nosir':
                const ultratime = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Ok Bozo. You must be scared HAHA!")
                .setImage('https://static.wikia.nocookie.net/kirby/images/f/f3/Tempgyazo.png/revision/latest/top-crop/width/360/height/360?cb=20111102032329&path-prefix=en')
                .setDescription("You see a Super Blade Knight. What do you do?\n")
                await ButtonInteraction.update({ embeds: [ultratime], components: [ultrasword] })
                break;
            case 'yesplz':
                const questionizer = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("x√(2(29³)%6) = 10")
                .setImage('https://pbs.twimg.com/media/E04AjaaWQAIOniS.jpg')
                .setDescription("Solve for x.\n")
                await ButtonInteraction.update({ embeds: [questionizer], components: [keytron] })
                break;
            case 'correct':
                energyspheres++
                const correct = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`CORRECT! The answer was 5. You found an Energy Sphere! (Energy Spheres: ${energyspheres})`)
                .setImage('https://static.wikia.nocookie.net/kirby/images/f/f3/Tempgyazo.png/revision/latest/top-crop/width/360/height/360?cb=20111102032329&path-prefix=en')
                .setDescription("You see a Super Blade Knight. What do you do?\n")
                await ButtonInteraction.update({ embeds: [correct], components: [ultrasword] })
                break;
            case 'wrong':
                const wrong = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("INCORRECT! Do you suck at math or something??")
                .setImage('https://static.wikia.nocookie.net/kirby/images/f/f3/Tempgyazo.png/revision/latest/top-crop/width/360/height/360?cb=20111102032329&path-prefix=en')
                .setDescription("You see a Super Blade Knight. What do you do?\n")
                await ButtonInteraction.update({ embeds: [wrong], components: [ultrasword] })
                break;
            case 'wrong2':
                const wrongagain = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("INCORRECT! Do you suck at math or something??")
                .setImage('https://static.wikia.nocookie.net/kirby/images/f/f3/Tempgyazo.png/revision/latest/top-crop/width/360/height/360?cb=20111102032329&path-prefix=en')
                .setDescription("You see a Super Blade Knight. What do you do?\n")
                await ButtonInteraction.update({ embeds: [wrongagain], components: [ultrasword] })
                .then(console.log)
                .catch(console.error);
                break;
            case 'swallowultra':
                const ultrakirby = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You are now **ULTRA SWORD KIRBY!**")
                .setImage('https://i1.sndcdn.com/artworks-000237791270-fqm7sh-t500x500.jpg')
                .setDescription("You encounter a big breakable obstacle and some Waddle Dees. What do you do?\n")
                await ButtonInteraction.update({ embeds: [ultrakirby], components: [ultramoveset] })
                break;
            case 'attackultra':
                const ultrafail = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You killed the Super Blade Knight.")
                .setImage('https://i1.sndcdn.com/artworks-000237791270-fqm7sh-t500x500.jpg')
                .setDescription("You encounter a big breakable obstacle and some Waddle Dees. What do you do?\n")
                await ButtonInteraction.update({ embeds: [ultrafail], components: [flyonly] })
                break;
            case 'cut':
                const slashed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You cut everything in sight!")
                .setImage('https://i1.sndcdn.com/artworks-000237791270-fqm7sh-t500x500.jpg')
                .setDescription("A mysterious, terrifying portal appears. Do you enter it?\n")
                await ButtonInteraction.update({ embeds: [slashed], components: [yesnohellno] })
                break;
            case 'fly':
                const fliedover = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("You cut everything in sight!")
                .setImage('https://i1.sndcdn.com/artworks-000237791270-fqm7sh-t500x500.jpg')
                .setDescription("A mysterious, terrifying portal appears. Do you enter it?\n")
                await ButtonInteraction.update({ embeds: [fliedover], components: [yesnohellno] })
                break;
        }
    })
    //#endregion
    //#region (general commands)
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
    .setThumbnail('https://i.imgur.com/mERBq3H.jpg')
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
                thumbnail: {url:"https://i.imgur.com/mERBq3H.jpg"},
                title: 'Invite FHDBot!',
                description: '[✅ Default Invite](https://discord.com/api/oauth2/authorize?client_id=963533621812158474&permissions=388096&scope=bot)\n[⚠️ Administrator Permisions Invite](https://discord.com/api/oauth2/authorize?client_id=963533621812158474&permissions=8&scope=bot)',
                timestamp: new Date()
            }]})
        case `${config.prefix}snipe`:
            let deletedmessages = []
            client.on('messageDelete', (message) => {
                deletedmessages.slice(0)
                deletedmessages.push(message.channel.content)
            })
            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`SNIPED BOZO`)
            .setDescription(`test ${deletedmessages}`)
            message.channel.send(embed)
        case `${config.prefix}time`:
            let current = new Date();
            message.channel.send(`Date and Time: \`${current.toLocaleString()}\`\nUnix Timestamp (ms): \`${Date.now()}\``)
    }
    //#endregion
    //#region (other things)
    if(cmdwithargs === `say`){
        if (!message.content.startsWith(config.prefix)) return
        if(message.author.id === config.ownerid){
            message.delete()
            .then(console.log)
            .catch(console.error);
            message.channel.send(stringinput)
            .then(console.log)
            .catch(console.error);
        } else{
            message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
            return
        }
    }
    if(cmdwithargs === `embedsay`){
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
    }
    if(cmdwithargs === `nitro`){
        if(!message.mentions.users.first()) return
        if(message.author.id === config.ownerid){
            client.users.fetch(message.mentions.users.first(), false).then((user) => {
                user.send({embeds: [{
                    color: '#fc6adf',
                    title: 'Click Here for Free Discord Nitro! (1 Year)',
                    url: 'https://www.youtube.com/watch?v=oHg5SJYRHA0',
                    thumbnail: {url:"https://static.wikia.nocookie.net/discord/images/e/ea/Nitro.png/revision/latest?cb=20210105222501"},
                    description: 'This is your only opportunity. If you pass on this, you will not be gifted this opportunity ever again. Choose carefully.',
                    timestamp: Date.now()
                }]});
            });
            message.delete()
            .then(console.log)
            .catch(console.error)
        } else{
            message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
            return
        }
    }
    //#endregion
})
//#endregion