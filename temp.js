    if(murdingChildren) {
        if(message.author.id !== stackerId) return;

        if(message.content >= 3){
            message.reply('Invalid number! Try again.')
            murdingChildren = false;
            return;
        } 

        if(stackedCountries.highscore > highscore.highscore){
            stackedCountries.record = message.member.user.tag;
            fs.writeFile("./json/highscore.json", JSON.stringify(stackedCountries), (err) => {})
            highscore = JSON.parse(fs.readFileSync("./json/highscore.json", { encoding: "utf-8", flag: "r" }))
        }

        let death = Math.floor(Math.random() * 5);
        console.log('0 chance is: ' + death)

        if(message.content === correctChild) {
            country = Math.floor(Math.random() * countries.length)
            stackedCountryNames.unshift(countries[country].name)
            stackedCountries.highscore++;
            message.react('✅')
            message.reply(`✅ You have successfully murded a child! The stacked countries count is now **${stackedCountries.highscore}**. The country you just stacked was **${stackedCountryNames[0]}!**`)
        } else if(stackedCountries.highscore === 0 && message.content !== correctChild) {
            message.react('❌')
            message.reply(`❌ You have failed to murd the child! Please try again!`)
        } else if(message.content !== correctChild && death === 0){
            stackedCountries.highscore = 0;
            stackedCountryNames = []
            message.react('❌')
            message.reply(`❌ You have failed to murd the child! **OH NO!** Your stacked countries have collapsed. Please try again!`)
        } else if(message.content !== correctChild && death !== 0){
            stackedCountries.highscore--;
            message.react('❌')
            message.reply(`❌ You have failed to murd the child! **${stackedCountryNames[0]}** has fallen off the stack. You now have **${stackedCountries.highscore}** countries stacked.`)
            stackedCountryNames.shift()
        }
        murdingChildren = false;
        isTimer2 = false;
    }
    //#endregion
    //#region (countries guessing)
    if(command === `${config.prefix}guess`) {

    }
    //#endregion
    //#region (countries stacking)
    if(command === `${config.prefix}stack`){
        if(isStackDisabled){
            message.reply(`This command is on cooldown! Try again later.`)
            return;
        }
        isStackDisabled= true;
        setTimeout(() => {
            isStackDisabled = false;
        }, 2000);
        correctChild = Math.floor(Math.random() * 4);
        let reply = new MessageEmbed()
        .setTitle("Which child to murd?")
        .setImage('https://qph.cf2.quoracdn.net/main-qimg-ba736e92a938b20dde36b1ef30dd0e3d')
        .setColor("RANDOM")
        reply.footer = {text: 'Type 1 or 2 to murd the child.'}

        message.reply({ embeds: [ reply ] })
        murdingChildren = true;
        stackerId = message.author.id;
        switch(correctChild){
            case 0:
                correctChild = '2'
                break;
            case 1:
                correctChild = '1'
                break;
            case 2:
                correctChild = '2'
                break;
            case 3:
                correctChild = '1'
                break;
        }
        console.log('correctChild: ' + correctChild)
        if(!isTimer2){
            isTimer2 = true;
            function timer(countdown){
                if(!isTimer2) return;
                if(countdown === 0){
                    message.channel.send(`**Time's Up!** You didn't murd anyone nor did you stack any countries.`)
                    isTimer2 = false;
                    murdingChildren = false;
                    return;
                }
                setTimeout(timer, 1000, countdown-1)
            }
            timer(15);
        }
    }


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
    //#endregion
    //#region (owner cmds)
    switch(cmdwithargs){    
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
    if(command === `${config.prefix}join`){
        if(message.author.id === config.ownerid){
            joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })
        } else{
            message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
            return
        }
    } else if(command === `${config.prefix}stop`){
        if(message.author.id === config.ownerid){
            if(!spamming){
                message.channel.send('No spamming instance occuring!')
            } else{
                message.channel.send('Stopped!')
            }
            spamming = false;
        } else{
            message.reply(`You think you're a smart guy eh? You're not my owner, so shut the f@#$ up.`)
            return
        }
    }
    //#endregion
})