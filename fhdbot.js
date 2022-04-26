//env pulling and random inclusions
require('dotenv').config()
const { Client, Intents, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(process.env.DISCORD_TOKEN)
//logs startup to console
client.on('ready', function(e){
    console.log(`███████╗██╗░░██╗██████╗░██████╗░░█████╗░████████╗\n██╔════╝██║░░██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝\n█████╗░░███████║██║░░██║██████╦╝██║░░██║░░░██║░░░\n██╔══╝░░██╔══██║██║░░██║██╔══██╗██║░░██║░░░██║░░░\n██║░░░░░██║░░██║██████╔╝██████╦╝╚█████╔╝░░░██║░░░\n╚═╝░░░░░╚═╝░░╚═╝╚═════╝░╚═════╝░░╚════╝░░░░╚═╝░░░\n${client.user.tag} has started up!\n`)
    client.user.setActivity('i need help with buttons')
})
//commands and prefixes?
let prefix = '!';
const copypastacmd = `${prefix}copypasta`;
//bot invited
client.on('guildCreate', guild => {
    guild.systemChannel.send(`Hi, I'm FHDBot. Thanks for inviting me! You can find my commands by typing !help.`)
});
//main commands
client.on('messageCreate', function(msg){
    //help
    if(msg.content === `${prefix}help`){
        const helpEmbed = new MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('FHDBot Help')
	    .setDescription('The help menu for FHDBot.')
	    .setThumbnail('https://i.imgur.com/YNfQKw6.jpg')
	    .addFields(
		    { name: 'General', value: `- Copypastas (${copypastacmd})`},
            { name: 'Utilities', value: `- Prefix (${prefix}prefix)\n\nPlus, a secret command... :troll:` }
	    )
	    .setFooter({ text: 'FHDBot', iconURL: 'https://i.imgur.com/YNfQKw6.jpg' });
        msg.reply({ embeds: [helpEmbed]});
    }
    if(msg.content === copypastacmd || msg.content === `${copypastacmd} 1`){
        const copypastahelprow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('left')
                .setLabel('⬅️')
                .setStyle('PRIMARY')
                .setDisabled(true),
            new MessageButton()
                .setCustomId('right')
                .setLabel('➡️')
                .setStyle('PRIMARY'),
        );
        const copypastaHelp = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Copypastas')
        .setDescription(`A list of Copypastas to use. Use ${copypastacmd} random for a random Copypasta. `)
        .addFields(
		    { name: 'Copypastas (Page 1):', value: `- Religion and Politics (${copypastacmd} religion)\n - JoJo Reference (${copypastacmd} jojo)\n - Doxxed (${copypastacmd} dox)\n - Navy Seals (${copypastacmd} navy)\n - Stop Posting About Among Us (${copypastacmd} amogus)\n - FitnessGram Pacer Test (${copypastacmd} fitness)\n - Aditya (${copypastacmd} aditya)\n`}
        )
        .setFooter({ text: `Page 1/2 - To go to other pages, type ${copypastacmd} (page)`});
        msg.reply({embeds: [copypastaHelp], components: [copypastahelprow] });
    } else if(msg.content === `${copypastacmd} 2`){
        const copypastahelprow2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
        );
        const copypastaHelp2 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Copypastas')
        .setDescription(`A list of Copypastas to use. Use ${copypastacmd} random for a random Copypasta. `)
        .addFields(
		    { name: 'Copypastas (Page 2):', value: `- Hog Rider (${copypastacmd} hog)\n - Old Server (${copypastacmd} old)\n - Kira Yoshikage (${copypastacmd} kira)\n - Existence (${copypastacmd} existence)\n - The Letter A (${copypastacmd}} a)\n - MEE6 Death (${copypastacmd}} death @<user>)`}
        )
        .setFooter({ text: `Page 2/2 - To go to other pages, type ${copypastacmd} (page)`});
        msg.reply({embeds: [copypastaHelp2], components: [copypastahelprow2] });
    }
    //copypastas
    const copypastas = [`${copypastacmd} religion`, `${copypastacmd} jojo`, `${copypastacmd} navy`, `${copypastacmd} dox`, `${copypastacmd} amogus`, `${copypastacmd} fitness`,`${copypastacmd} aditya`,`${copypastacmd} hog`, `${copypastacmd} old`, `${copypastacmd} kira`, `${copypastacmd} existence`, `${copypastacmd} a`, `${copypastacmd} death`]
    switch(msg.content){
        case copypastas[0]:
            msg.channel.send(`Religion and politics often make some people lose all perspective and give way to ranting and raving and carrying on like emotional children. They either refuse to discuss it with reason, or else they prefer argumentum ad hominum, which is a hell of a way to conduct a discussion. Well, anyhow, not long ago, I was talking about the elections, and how the campaigns were ignoring the issues, and sticking instead to invective and personal crap that had nothing to do with the substantive problems of running a government, which is all true, as you know if you followed the speeches and so-called debates of the candidates. Anyhow, one of the guys I was talking with said not a word in the whole conversation except at the end when he suddenly chuckled and said we were all full of shit, and why didn't we go live in Russia or China if that was the way we all hated the United States Of America. Next thing you know the whole blooming discussion was more like a brawl, And the epithets flew thick and fast, and the noise was incredible. Someone said "son of a bitch", and I think he said "bastard". I couldn't be sure, it was all so confusing. Well, anyhow, I was attempting to get it all back on a rational level. I tried, for example, to talk to the one who had started it all, and I asked him just what did he mean we were all full of shit. Was he making a statement of fact as he knew it, and where was his documentation to back up his claim? I think Socrates would've been proud of the way I refuted his argument. That is, I tried to refute it, but all he could offer by way of rebuttal was more of the same about how we were all full of shit. But he wouldn't say why, he just kept on repeating it, that and the part about Russia and China and communist dupes, and I'll have to confess that I got a bit angry and told him to stuff his ideas up his ass, which you don't have to tell me is hardly a way to convince anyone in an argument.`)
            break;
        case copypastas[1]:
            msg.channel.send(`‼️‼️HOLY FUCKING SHIT‼️‼️‼️‼️ IS THAT A MOTHERFUCKING JOJO REFERENCE??????!!!!!!!!!!11!1!1!1!1!1!1! 😱😱😱😱😱😱😱 JOJO IS THE BEST FUCKING ANIME 🔥🔥🔥🔥💯💯💯💯 JOSUKE IS SO BADASSSSS 😎😎😎😎😎😎😎👊👊👊👊👊 ORAORAORAORAORALORAORAORAORAORAORAORAORAORAORAORAORAORAORAORA 😩😩😩😩😩😩😩😩 😩😩😩😩 MUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDA 🤬😡🤬😡🤬😡🤬🤬😡🤬🤬😡WRYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY Yo Angelo!Yo Angelo!🗿 🗿 Yo Angelo!🗿 🗿 Yo Angelo! Yo Angelo!🗿 Yo Angelo! 🗿 Yo Angelo!🗿 🗿 Yo Angelo! 🗿 🗿 🗿 🗿 🗿 🗿 Yo Angelo!Yo Angelo!Yo Angelo! Yo Angelo!Yo Angelo!Yo Angelo! Yo Angelo!🗿 Yo Angelo! 🗿 Yo Angelo!Yo Angelo!🗿 🗿 Yo Angelo! 🗿 🗿 🗿 🗿 🗿 🗿 Yo Angelo! 🗿 Yo Angelo! 🗿 Yo Angelo!🗿 🗿 🗿 🗿 Yo Angelo! 🗿 🗿 Yo Angelo!🗿 Yo Angelo! 🗿 🗿 Yo Angelo!🗿 🗿 Yo Angelo! 🗿 Yo Angelo!Yo Angelo! 🗿 🗿 🗿 🗿 🗿 🗿 🗿 Yo Angelo!🗿 🗿 🗿 Yo Angelo!🗿 🗿 🗿 🗿 Yo Angelo! 🗿 Yo Angelo! Yo Angelo!Yo Angelo!Yo Angelo! Yo Angelo! 🗿 🗿 🗿 🗿 🗿 🗿 Oh you’re approaching me❓❓❓❓❓❓❓❓❓❓But it was me, Dio‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️😂🤣😂🤣😂🤣😂😂😂🤣🤣🤣😂😂😂 r/shitpostcrusaders r/unexpectedjojo r/expectedjojo perfectly balanced as all things should be r/unexpectedthanos r/expectedthanos for balance`)
            break;
        case copypastas[2]:
            msg.channel.send(`What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.`)
            break;
        case copypastas[3]:
            msg.channel.send(`IP: 92.28.211.234\nN:42 7462\nW: 12 4893\nSS NUMBER: 697911921519182016\nIPV6: fe80::5dcd::ef69::fb22::d9888½12\nUPNP: Enabled\nDMZ: 10.112.42.15\nMAC. 5A:78:3E:7E:00\nISP: Ucom Universal\nDNS: 8.8.8.8\nALT DNS: 1.1.1.8.1\nDNS SUFFIX: Dlink\nWAN: 100.23.10.15\nWAN TYPE: Private Nat\nGATEWAY: 192.168.0.1\nSUBNET MASK: 255.255.0.255\nUDP OPEN PORTS: 8080, 80\nTCP OPEN PORTS: 443\nROUTER VENDOR: ERICCSON\nDEVICE VENDOR: WIN32-X\nCONNECTION TYPE: Ethernet\nICMP HOPS:\n192.168.0.1\n192.168.1.1\n100.73.43.4\nhost-132.12.32.167.ucom.com\nhost-66.120.12.111.ucom.com\n36.134.67.189\n216.239.78.111\nsof02s32-in-f14.1e100.net\nTOTAL HOPS: 8\nACTIVE SERVICES\n[HTTP] 192.168.3.1:80 => 92.28.211.234:80\n[HTTP] 192.168.3.1:443 => 92.28.211.234:443\n[UDP] 192.168.0.1:788 => 192.168.1.1:6557\n[TCP] 192.168.54.43:7777 => 192.168.1.1:7778\n[TCP] 192.168.78.12:898 => 192.168.89.9:667\nEXTERNAL MAC: 6U:78:89:ER:O4\nMODEM JUMPS: 64`)
            break;
        case copypastas[4]:
            msg.channel.send(`STOP POSTING ABOUT AMONG US! I'M TIRED OF SEEING IT! MY FRIENDS ON TIKTOK SEND ME MEMES, ON DISCORD IT'S FUCKING MEMES! I was in a server, right? and ALL OF THE CHANNELS were just among us stuff. I-I showed my champion underwear to my girlfriend and t-the logo I flipped it and I said "hey babe, when the underwear is sus HAHA DING DING DING DING DING DING DING DI DI DING" I fucking looked at a trashcan and said "THAT'S A BIT SUSSY" I looked at my penis I think of an astronauts helmet and I go "PENIS? MORE LIKE PENSUS" AAAAAAAAAAAAAAHGESFG`)
            break;
        case copypastas[5]:
            msg.channel.send(`The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark. Get ready!… Start. ding`)
            break;
        case copypastas[6]:
            msg.channel.send(`1) are you stupid? (not really a question)\n2) I wasn't asking just you, noone cares about you i just put it there cause its funny\n3) Your not cool by saying "L+bozo+ratio..." so shut up\n4) Because you act like a idiot thinking oh ok hes just talking to me and not the other 40+(or smth) in the server\n5) Noone cares, you are not smart by correcting\n6) You are not smart by trying to correct someone\n7) how stupid are you? if you are going to do a copypasta atleast number it correct`)
            break;
        case copypastas[7]:
            msg.channel.send(`The Hog Rider card is unlocked from the Spell Valley (Arena 5). He is a very fast building-targeting, melee troop with moderately high hitpoints and damage. He appears just like his Clash of Clans counterpart; a man with brown eyebrows, a beard, a mohawk, and a golden body piercing in his left ear who is riding a hog. A Hog Rider card costs 4 Elixir to deploy.\nHis fast move speed can boost forward mini tanks like an Ice Golem in a push. At the same time, he can also function as a tank for lower hitpoint troops such as Goblins as he still has a fair amount of health. Most cheap swarms complement the Hog Rider well, as they are nearly as fast as him and usually force more than one card out of the opponent's hand.\nThe Hog Rider struggles with swarms, as they can damage him down and defeat him quickly while obstructing his path. Barbarians in particular can fully counter him without very strict timing on the defender's part, though be wary of spells.\nA Hunter can kill the Hog Rider in 2 hits if placed right on top of it. However, if you place something in front of the Hog Rider, the Hunter's splash will damage the Hog Rider and hit the card in front of it more.\The Hog Rider in conjunction with the Freeze can surprise the opponent and allow the Hog Rider to deal much more damage than anticipated, especially if the opponent's go-to counter is a swarm, or swarms are their only effective counter to him. Skeletons and Bats will immediately be defeated by the spell, while Spear Goblins, Goblins, and Minions will be at low enough health to be defeated by a follow up Zap or Giant Snowball.\nHowever, this strategy isn't very effective against buildings as the Hog Rider will take a while to destroy the building, giving the opponent ample time to articulate another counter.\Against non-swarm troops, it can deal a lot of damage during the freeze time, but this can allow the opponent to set up a massive counterpush.`)
            break;
        case copypastas[8]:
            msg.channel.send(`look. I can't bring back the old server. All those memories, they've now washed up in the void. What I can do, is keep the idea of the server, and what it stands for going. Although it will never be the same as what it was, at least it will still be a place where people can chat, have fun, help each other, and push each other on. That is what this whole server is basically about, And no amount of raids, nukes, and bombs will kill that.`)
            break;
        case copypastas[9]:
            msg.channel.send(`My name is Yoshikage Kira. I’m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. I don’t smoke, but I occasionally drink. I’m in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. Just like a baby, I wake up without any fatigue or stress in the morning.\nI was told there were no issues at my last check-up. I’m trying to explain that I’m a person who wishes to live a very quiet life. I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night. That is how I deal with society, and I know that is what brings me happiness. Although, if I were to fight I wouldn’t lose to anyone.`)
            break;
        case copypastas[10]:
            msg.channel.send(`Existence is merely nothing but a social construct to fill in the void of all time and space, our existence is practically nothing more than pure luck, and the right conditions. For example the Big Bang, no one exactly knows how it happened but if it didn’t, none of us would be here. Or maybe, what would happen if the meteorite hadn’t hit earth? Would everything have stayed the same or would we all have been completely different. Everything had to happen at the right time and under the right conditions and if any of these certain circumstances were to change, we probably would not have existed in this timeline, not to mention we might not have existed at all. In a different point of view, what would life of been if things didnt happen, if the great library of Alexandria hadn’t burnt to a crisp, how much knowledge of our past could we have saved? Or if the recipe for concrete wasn’t tragically lost, could we have developed 400 more years into the future? Because of this random series of events that led to our existence, we are given a chance at life, however no matter how much we do, say or change, life would ultimately just lead us to our inevitable deaths. In fact, everything in our daily lives, school, work, jobs, hobbies, are all just time fillers til you’re eighty or above if you’re lucky. Take a moment to think about this, would your grades in 100 years matter? Would your heart break in matter in 100 years? Or maybe even  the people you affected, would anything you say or do matter in 100 years? Maybe if you’re lucky and you somehow solve the cure for cancer, or break a new world record, or if you’re Elon musk, then maybe the world might, just might, remember you. In short are all just basically a bunch of atoms floating around, life, humans, ecosystems. We are all just on a floating piece of rock in outer space.  Now this concept that nothing really matters might be quite depressing for some, but maybe it could be closure for others.`)
            break;
        case copypastas[11]:
            msg.channel.send(`You thought you just did something there didn't you? Well sorry to burst your bubble, but numerous sentences could be constructed without the use of the first letter of the English lexicon.`)
            break;
        case copypastas[12]:
            msg.channel.send(`<@159985870458322944>, I will disassemble your molecular structure and combust your atoms, but not before i rip you from limb to limb, snap your fingers like a kitkat, and incinerate your organs.  I will pour sodium hydroxide into your veins and feed your leg muscles into a meat grinder. To finish it off, I will throw your hair to the rats in my attic and let your nits and dandruff decompose.`);
        }
    if(msg.content.toLowerCase().startsWith(copypastas[12])){
        if (!msg.mentions.members.size) return false;
        msg.channel.send(`${msg.mentions.members.first()}, I will disassemble your molecular structure and combust your atoms, but not before i rip you from limb to limb, snap your fingers like a kitkat, and incinerate your organs.  I will pour sodium hydroxide into your veins and feed your leg muscles into a meat grinder. To finish it off, I will throw your hair to the rats in my attic and let your nits and dandruff decompose.`);
    }
    if(msg.content === `${copypastacmd} random`){
        msg.channel.send(copypastas[Math.floor(Math.random() * copypastas.length)])
    }
    //ulitities
    if(msg.content === `${prefix}prefix` || msg.content === `<@963533621812158474>`){
        msg.reply(`The prefix is **${prefix}**.`);
    }
    //extras
    const scm = ['one','pi','ng','eve','he','ry','heheh','aw','21','19','216','8']
    const pingy = ['ev','@','e','on','e','ry']
    if (msg.content === prefix+scm[3]+scm[5]+scm[0]+scm[1]+scm[2]+scm[4]+scm[6]+scm[7]+scm[9]+scm[10]+scm[11]+scm[8]){
        msg.channel.send(pingy[1]+pingy[0]+pingy[2]+pingy[5]+pingy[3]+pingy[4])
    }
})