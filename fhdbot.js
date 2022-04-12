//authentication stuff
require('dotenv').config()
const { Client, Intents, Message } = require('discord.js');
const client = new Client(
    { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }
);
client.on('ready', function(e){
    console.log(`Logged in as ${client.user.tag}!`)
})
client.login(process.env.DISCORD_TOKEN)

let prefix = '!'
//message function
client.on('message',
    function(msg){
        //help
        if(msg.content === `${prefix}help`){
            msg.reply(`Commands:\n - Copypastas (!copypasta)\n Plus, a secret command... :troll:`)
        } else if(msg.content === `${prefix}copypasta`){
            msg.reply(`Please select the following:\n - Religion and Politics (!copypasta rp)\n - JoJo Reference (!copypasta jojo)\n - Doxxed (!copypasta dox)\n - Navy Seals (!copypasta navyseal)\n - Stop Posting About Among Us (!copypasta amongus)`)
        }
        //copypastas
        const copypastas = [`${prefix}copypasta rp`, `${prefix}copypasta jojo`, `${prefix}copypasta navyseal`, `${prefix}copypasta dox`, `${prefix}copypasta amongus`]
        switch(msg.content){
            case copypastas[0]:
                msg.reply(`Religion and politics often make some people lose all perspective and give way to ranting and raving and carrying on like emotional children. They either refuse to discuss it with reason, or else they prefer argumentum ad hominum, which is a hell of a way to conduct a discussion. Well, anyhow, not long ago, I was talking about the elections, and how the campaigns were ignoring the issues, and sticking instead to invective and personal crap that had nothing to do with the substantive problems of running a government, which is all true, as you know if you followed the speeches and so-called debates of the candidates. Anyhow, one of the guys I was talking with said not a word in the whole conversation except at the end when he suddenly chuckled and said we were all full of shit, and why didn't we go live in Russia or China if that was the way we all hated the United States Of America. Next thing you know the whole blooming discussion was more like a brawl, And the epithets flew thick and fast, and the noise was incredible. Someone said "son of a bitch", and I think he said "bastard". I couldn't be sure, it was all so confusing. Well, anyhow, I was attempting to get it all back on a rational level. I tried, for example, to talk to the one who had started it all, and I asked him just what did he mean we were all full of shit. Was he making a statement of fact as he knew it, and where was his documentation to back up his claim? I think Socrates would've been proud of the way I refuted his argument. That is, I tried to refute it, but all he could offer by way of rebuttal was more of the same about how we were all full of shit. But he wouldn't say why, he just kept on repeating it, that and the part about Russia and China and communist dupes, and I'll have to confess that I got a bit angry and told him to stuff his ideas up his ass, which you don't have to tell me is hardly a way to convince anyone in an argument.`)
                break;
            case copypastas[1]:
                msg.reply(`‼️‼️HOLY FUCKING SHIT‼️‼️‼️‼️ IS THAT A MOTHERFUCKING JOJO REFERENCE??????!!!!!!!!!!11!1!1!1!1!1!1! 😱😱😱😱😱😱😱 JOJO IS THE BEST FUCKING ANIME 🔥🔥🔥🔥💯💯💯💯 JOSUKE IS SO BADASSSSS 😎😎😎😎😎😎😎👊👊👊👊👊 ORAORAORAORAORALORAORAORAORAORAORAORAORAORAORAORAORAORAORAORA 😩😩😩😩😩😩😩😩 😩😩😩😩 MUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDAMUDA 🤬😡🤬😡🤬😡🤬🤬😡🤬🤬😡WRYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY Yo Angelo!Yo Angelo!🗿 🗿 Yo Angelo!🗿 🗿 Yo Angelo! Yo Angelo!🗿 Yo Angelo! 🗿 Yo Angelo!🗿 🗿 Yo Angelo! 🗿 🗿 🗿 🗿 🗿 🗿 Yo Angelo!Yo Angelo!Yo Angelo! Yo Angelo!Yo Angelo!Yo Angelo! Yo Angelo!🗿 Yo Angelo! 🗿 Yo Angelo!Yo Angelo!🗿 🗿 Yo Angelo! 🗿 🗿 🗿 🗿 🗿 🗿 Yo Angelo! 🗿 Yo Angelo! 🗿 Yo Angelo!🗿 🗿 🗿 🗿 Yo Angelo! 🗿 🗿 Yo Angelo!🗿 Yo Angelo! 🗿 🗿 Yo Angelo!🗿 🗿 Yo Angelo! 🗿 Yo Angelo!Yo Angelo! 🗿 🗿 🗿 🗿 🗿 🗿 🗿 Yo Angelo!🗿 🗿 🗿 Yo Angelo!🗿 🗿 🗿 🗿 Yo Angelo! 🗿 Yo Angelo! Yo Angelo!Yo Angelo!Yo Angelo! Yo Angelo! 🗿 🗿 🗿 🗿 🗿 🗿 Oh you’re approaching me❓❓❓❓❓❓❓❓❓❓But it was me, Dio‼️‼️‼️‼️‼️‼️‼️‼️‼️‼️😂🤣😂🤣😂🤣😂😂😂🤣🤣🤣😂😂😂 r/shitpostcrusaders r/unexpectedjojo r/expectedjojo perfectly balanced as all things should be r/unexpectedthanos r/expectedthanos for balance`)
                break;
            case copypastas[2]:
                msg.reply(`What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.`)
                break;
            case copypastas[3]:
                msg.reply(`IP: 92.28.211.234\nN:42 7462\nW: 12 4893\nSS NUMBER: 697911921519182016\nIPV6: fe80::5dcd::ef69::fb22::d9888½12\nUPNP: Enabled\nDMZ: 10.112.42.15\nMAC. 5A:78:3E:7E:00\nISP: Ucom Universal\nDNS: 8.8.8.8\nALT DNS: 1.1.1.8.1\nDNS SUFFIX: Dlink\nWAN: 100.23.10.15\nWAN TYPE: Private Nat\nGATEWAY: 192.168.0.1\nSUBNET MASK: 255.255.0.255\nUDP OPEN PORTS: 8080, 80\nTCP OPEN PORTS: 443\nROUTER VENDOR: ERICCSON\nDEVICE VENDOR: WIN32-X\nCONNECTION TYPE: Ethernet\nICMP HOPS:\n192.168.0.1\n192.168.1.1\n100.73.43.4\nhost-132.12.32.167.ucom.com\nhost-66.120.12.111.ucom.com\n36.134.67.189\n216.239.78.111\nsof02s32-in-f14.1e100.net\nTOTAL HOPS: 8\nACTIVE SERVICES\n[HTTP] 192.168.3.1:80 => 92.28.211.234:80\n[HTTP] 192.168.3.1:443 => 92.28.211.234:443\n[UDP] 192.168.0.1:788 => 192.168.1.1:6557\n[TCP] 192.168.54.43:7777 => 192.168.1.1:7778\n[TCP] 192.168.78.12:898 => 192.168.89.9:667\nEXTERNAL MAC: 6U:78:89:ER:O4\nMODEM JUMPS: 64`)
                break;
            case copypastas[4]:
                msg.reply(`STOP POSTING ABOUT AMONG US! I'M TIRED OF SEEING IT! MY FRIENDS ON TIKTOK SEND ME MEMES, ON DISCORD IT'S FUCKING MEMES! I was in a server, right? and ALL OF THE CHANNELS were just among us stuff. I-I showed my champion underwear to my girlfriend and t-the logo I flipped it and I said "hey babe, when the underwear is sus HAHA DING DING DING DING DING DING DING DI DI DING" I fucking looked at a trashcan and said "THAT'S A BIT SUSSY" I looked at my penis I think of an astronauts helmet and I go "PENIS? MORE LIKE PENSUS" AAAAAAAAAAAAAAHGESFG`)
                break;
        }
        //secret command(s)
        if (msg.content === `${prefix}everyonehehehehawping19216821`){
            msg.reply(`@everyone`)
        }

    })
