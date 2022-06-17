//#region (startup and variables)
require('dotenv').config()
const { Client, Intents, Message, MessageEmbed, MessageActionRow, MessageButton, MessageReaction, MessageAttachment, VoiceChannel } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, StreamType, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");
let highscore = require("./highscore.json");
const fs = require('fs');
client.login(process.env.DISCORD_TOKEN)
client.on('ready', () => {
    console.log(`\x1B[31m███████╗██╗░░██╗██████╗░██████╗░░█████╗░████████╗\n\x1B[33m██╔════╝██║░░██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝\n\x1B[32m█████╗░░███████║██║░░██║██████╦╝██║░░██║░░░██║░░░\n\x1B[36m██╔══╝░░██╔══██║██║░░██║██╔══██╗██║░░██║░░░██║░░░\n\x1B[34m██║░░░░░██║░░██║██████╔╝██████╦╝╚█████╔╝░░░██║░░░\n\x1B[35m╚═╝░░░░░╚═╝░░╚═╝╚═════╝░╚═════╝░░╚════╝░░░░╚═╝░░░\n\x1B[0m${client.user.tag} has started up!\n`)    
    client.user.setActivity(`stacking countries by murding children`, { type: 'COMPETING', url: "https://www.twitch.tv/fhdhgngn" })
})
//#endregion
//#region (bot invited)
client.on('guildCreate', guild => {
    guild.systemChannel.send(`Hi, I'm FHDBot. Thanks for inviting me! You can find my commands by typing ${config.prefix}help.`)
    .then(console.log)
    .catch(console.error);
});
//#endregion
//#region (global variables)
let spamming = false;
let guessingCountry = false;
let murdingChildren = false;
let correctCountryName = "";
let correctChild = "";
let guesserId = "";
let stackerId = "";
let stackedCountries = {
    highscore: "",
    record: ""
}
let isTimer = false;
let isTimer2 = false;
let isStackDisabled = false;
//#endregion
//#region (messageCreate)
client.on('messageCreate', (message) => {
    if(message.author.id === client.user.id) return;
    //#region (priority)    
    const countries = [
        {name: "Afghanistan", flag: "https://cdn.britannica.com/40/5340-050-AA46700D/Flag-Afghanistan.jpg"},
        {name: "Albania", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/1200px-Flag_of_Albania.svg.png"},
        {name: "Algeria", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/1200px-Flag_of_Algeria.svg.png"},
        {name: "Andorra", flag: "https://cdn.britannica.com/83/5583-050-2F48FD32/Flag-Andorra.jpg"},
        {name: "Angola", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Angola.svg/1200px-Flag_of_Angola.svg.png"},
        {name: "Antigua and Barbuda", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Antigua_and_Barbuda.svg/800px-Flag_of_Antigua_and_Barbuda.svg.png"},
        {name: "Nengish Union", flag: "https://media.discordapp.net/attachments/972647486915223562/986743144144072805/unknown.png"},
        {name: "Nengish Union", flag: "https://media.discordapp.net/attachments/972647486915223562/986743144144072805/unknown.png"},
        {name: "Nengish Union", flag: "https://media.discordapp.net/attachments/972647486915223562/986743144144072805/unknown.png"},
        {name: "Nengish Union", flag: "https://media.discordapp.net/attachments/972647486915223562/986743144144072805/unknown.png"},
        {name: "Argentina", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png"},
        {name: "Armenia", flag: "https://www.worldatlas.com/img/flag/am-flag.jpg"},
        {name: "Aruba", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Aruba.svg/1200px-Flag_of_Aruba.svg.png"},
        {name: "Australia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1200px-Flag_of_Australia_%28converted%29.svg.png"},
        {name: "Austria", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/1200px-Flag_of_Austria.svg.png"},
        {name: "Azerbaijan", flag: "https://media.istockphoto.com/vectors/flags-of-the-world-vector-id1323578098?k=20&m=1323578098&s=612x612&w=0&h=JeGSRFm1cen1pNbs_L6HWveEYGHhM0_a-wwTXM6rEKY="},
        {name: "Bahamas", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flag_of_the_Bahamas.svg/1280px-Flag_of_the_Bahamas.svg.png"},
        {name: "Bahrain", flag: "https://cdn.britannica.com/27/70827-050-8D001288/Bahraini-flag-2002.jpg"},
        {name: "Bangladesh", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/1200px-Flag_of_Bangladesh.svg.png"},
        {name: "Barbados", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Barbados.svg/800px-Flag_of_Barbados.svg.png?20220408053327"},
        {name: "Belarus", flag: "https://i.pinimg.com/originals/a4/2f/f7/a42ff7f06292e4e5323f37dccb531ee4.jpg"},
        {name: "Belgium", flag: "https://cdn.britannica.com/08/6408-004-405E272F/Flag-Belgium.jpg"},
        {name: "Belize", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flag_of_Belize.svg/1200px-Flag_of_Belize.svg.png"},
        {name: "Benin", flag: "https://www.worldatlas.com/img/flag/bj-flag.jpg"},
        {name: "Bhutan", flag: "https://cdn.britannica.com/79/6479-004-BDDD1FE1/flag-dragon-image-Bhutan-design.jpg"},
        {name: "Bolivia", flag: "https://cdn.britannica.com/54/6754-004-AE3C4294/Flag-Bolivia.jpg"},
        {name: "Bosnia and Herzegovina", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Bosnia_and_Herzegovina.svg/1200px-Flag_of_Bosnia_and_Herzegovina.svg.png"},
        {name: "Botswana", flag: "https://cdn.britannica.com/15/4215-004-F844A05D/Flag-Botswana.jpg"},
        {name: "Brazil", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/640px-Flag_of_Brazil.svg.png"},
        {name: "Brunei", flag: "https://cdn.britannica.com/24/4024-050-7385D7F2/Flag-Brunei.jpg"},
        {name: "Bulgaria", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/1200px-Flag_of_Bulgaria.svg.png"},
        {name: "Burkina Faso", flag: "https://cdn.britannica.com/40/5040-004-B1F985C9/Flag-Burkina-Faso.jpg"},
        {name: "Burundi", flag: "https://cdn.britannica.com/77/7177-004-9D72922D/Flag-Burundi.jpg"},
        {name: "Cape Verde", flag: "https://cdn.britannica.com/44/5044-004-DEEC9E26/Flag-Cabo-Verde.jpg"},
        {name: "Cambodia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/2560px-Flag_of_Cambodia.svg.png"},
        {name: "Cameroon", flag: "https://cdn.britannica.com/42/5042-004-7FF4ACCA/Flag-Cameroon.jpg"},
        {name: "Canada", flag: "https://www.worldatlas.com/img/flag/ca-flag.jpg"},
        {name: "Central African Republic", flag: "https://cdn.britannica.com/80/7180-004-8AFA2B44/Flag-Central-African-Republic.jpg"},
        {name: "Chad", flag: "https://www.worldatlas.com/img/flag/td-flag.jpg"},
        {name: "Chile", flag: "https://cdn.britannica.com/85/7485-004-00B07230/Flag-Chile.jpg"},
        {name: "China", flag: "https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg"},
        {name: "Colombia", flag: "https://cdn.britannica.com/68/7668-004-08492AB7/Flag-Colombia.jpg"},
        {name: "Comoros", flag: "https://cdn.britannica.com/40/7740-004-01894F47/Flag-Comoros.jpg"},
        {name: "DR Congo", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/1200px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png"},
        {name: "Congo", flag: "https://cdn.britannica.com/82/7182-004-2F057893/Flag-Republic-of-the-Congo.jpg"},
        {name: "Costa Rica", flag: "https://www.worldatlas.com/img/flag/cr-flag.jpg"},
        {name: "Croatia", flag: "https://cdn.britannica.com/06/6206-004-14730C28/Flag-Croatia.jpg"},
        {name: "Cuba", flag: "https://cdn.britannica.com/10/5110-004-38075E57/Flag-Cuba.jpg"},
        {name: "Cyprus", flag: "https://cdn.britannica.com/83/7883-004-D09910C5/Flag-Cyprus.jpg"},
        {name: "Czech Republic", flag: "https://www.worldatlas.com/r/w1200/img/flag/cz-flag.jpg"},
        {name: "Ivory Coast", flag: "https://cdn.britannica.com/48/5048-004-EA370A21/Flag-Cote-dIvoire.jpg"},
        {name: "Denmark", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/640px-Flag_of_Denmark.svg.png"},
        {name: "Djibouti", flag: "https://cdn.britannica.com/06/06-004-29FFD888/Flag-Djibouti.jpg"},
        {name: "Dominica", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Flag_of_Dominica_%281978%E2%80%931981%29.svg/2560px-Flag_of_Dominica_%281978%E2%80%931981%29.svg.png"},
        {name: "Dominican Republic", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_the_Dominican_Republic.svg/1200px-Flag_of_the_Dominican_Republic.svg.png"},
        {name: "Ecuador", flag: "https://cdn.britannica.com/49/149-004-986E1BD8/flag-design-similarities-Ecuador-Colombia-flags-Venezuela.jpg"},
        {name: "Egypt", flag: "https://cdn.britannica.com/85/185-004-1EA59040/Flag-Egypt.jpg"},
        {name: "El Salvador", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_El_Salvador.svg/640px-Flag_of_El_Salvador.svg.png"},
        {name: "Equatorial Guinea", flag: "https://cdn.britannica.com/50/5050-004-EB18953A/Flag-Equatorial-Guinea.jpg"},
        {name: "Eritrea", flag: "https://cdn.britannica.com/09/09-050-203EC8B0/Flag-Eritrea.jpg"},
        {name: "Estonia", flag: "https://www.worldatlas.com/img/flag/ee-flag.jpg"},
        {name: "Eswatini", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_Eswatini.svg/1200px-Flag_of_Eswatini.svg.png"},
        {name: "Ethiopia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/1280px-Flag_of_Ethiopia.svg.png"},
        {name: "Fiji", flag: "https://cdn.britannica.com/86/3286-050-F16637E1/Flag-Fiji.jpg"},
        {name: "Finland", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/1200px-Flag_of_Finland.svg.png"},
        {name: "France", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/640px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png"},
        {name: "Gabon", flag: "https://cdn.britannica.com/85/7185-004-EBE5DBE5/Flag-Gabon.jpg"},
        {name: "Gambia", flag: "https://cdn.britannica.com/52/5052-004-C6FC398B/Flag-of-The-Gambia.jpg"},
        {name: "Georgia", flag: "https://www.worldatlas.com/img/flag/ge-flag.jpg"},
        {name: "Germany", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png"},
        {name: "Ghana", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/640px-Flag_of_Ghana.svg.png"},
        {name: "Greece", flag: "https://cdn.britannica.com/49/1049-004-AE4BAD3E/Flag-Greece.jpg"},
        {name: "Grenada", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Grenada.svg/1200px-Flag_of_Grenada.svg.png"},
        {name: "Guatemala", flag: "https://cdn.britannica.com/13/7213-004-FFC58C1D/Flag-Guatemala.jpg"},
        {name: "Guinea", flag: "https://cdn.britannica.com/56/5056-004-0E251CE7/Flag-Guinea.jpg"},
        {name: "Guinea-Bissau", flag: "https://cdn.britannica.com/58/5058-004-49C2D897/Flag-Guinea-Bissau.jpg"},
        {name: "Guyana", flag: "https://cdn.britannica.com/06/1106-004-F6772F48/Flag-Guyana.jpg"},
        {name: "Haiti", flag: "https://www.worldatlas.com/img/flag/ht-flag.jpg"},
        {name: "Honduras", flag: "https://cdn.britannica.com/16/7216-004-F1400CA0/Flag-Honduras.jpg"},
        {name: "Hungary", flag: "https://cdn.britannica.com/55/1455-004-5897143C/Flag-Hungary.jpg"},
        {name: "Iceland", flag: "https://cdn.britannica.com/85/1485-004-94C3DEDA/Flag-Iceland.jpg"},
        {name: "India", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"},
        {name: "Indonesia", flag: "https://www.worldatlas.com/r/w1200/img/flag/id-flag.jpg"},
        {name: "Iran", flag: "https://www.worldatlas.com/r/w1200/img/flag/ir-flag.jpg"},
        {name: "Iraq", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/1200px-Flag_of_Iraq.svg.png"},
        {name: "Ireland", flag: "https://www.irelandandbeyond.com/wp-content/uploads/2021/02/flag-ireland-1024x683.jpg.webp"},
        {name: "Israel", flag: "https://cdn.britannica.com/53/1753-004-03582EDA/Flag-Israel.jpg"},
        {name: "Italy", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/640px-Flag_of_Italy.svg.png"},
        {name: "Jamaica", flag: "https://www.worldatlas.com/r/w1200/img/flag/jm-flag.jpg"},
        {name: "Japan", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/800px-Flag_of_Japan.svg.png"},
        {name: "Jordan", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Jordan.svg/1200px-Flag_of_Jordan.svg.png"},
        {name: "Kazakhstan", flag: "https://www.worldatlas.com/r/w1200/img/flag/kz-flag.jpg"},
        {name: "Kenya", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/2560px-Flag_of_Kenya.svg.png"},
        {name: "Kiribati", flag: "https://cdn.britannica.com/88/3288-050-DB8EB516/Flag-Kiribati.jpg"},
        {name: "North Korea", flag: "https://www.worldatlas.com/r/w1200/img/flag/kp-flag.jpg"},
        {name: "South Korea", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/800px-Flag_of_South_Korea.svg.png"},
        {name: "Kuwait", flag: "https://www.worldatlas.com/img/flag/kw-flag.jpg"},
        {name: "Kyrgyzstan", flag: "https://www.worldatlas.com/r/w1200/img/flag/kg-flag.jpg"},
        {name: "Laos", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/2560px-Flag_of_Laos.svg.png"},
        {name: "Latvia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Latvia.svg/800px-Flag_of_Latvia.svg.png"},
        {name: "Lebanon", flag: "https://upload.wikimedia.org/wikipedia/commons/2/23/Flag_of_Lebanon_2019.jpg"},
        {name: "Lesotho", flag: "https://cdn.britannica.com/18/4218-004-3F1FD768/Lesotho-flag-colours-design-countries-sub-Saharan-African.jpg"},
        {name: "Liberia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_Liberia.svg/800px-Flag_of_Liberia.svg.png"},
        {name: "Libya", flag: "https://cdn.britannica.com/37/3037-004-1C8F9958/Flag-Libya.jpg"},
        {name: "Liechtenstein", flag: "https://cdn.britannica.com/02/2102-004-7650C719/Flag-Liechtenstein.jpg"},
        {name: "Lithuania", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Lithuania.svg/640px-Flag_of_Lithuania.svg.png"},
        {name: "Luxembourg", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Luxembourg.svg/640px-Flag_of_Luxembourg.svg.png"},
        {name: "Madagascar", flag: "https://cdn.britannica.com/46/2246-004-17A6E838/Flag-Madagascar.jpg"},
        {name: "Malawi", flag: "https://www.worldatlas.com/img/flag/mw-flag.jpg"},
        {name: "Malaysia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/1200px-Flag_of_Malaysia.svg.png"},
        {name: "Maldives", flag: "https://cdn.britannica.com/80/2280-004-E003C02B/Flag-Maldives.jpg"},
        {name: "Mali", flag: "https://www.worldatlas.com/img/flag/ml-flag.jpg"},
        {name: "Malta", flag: "https://cdn.britannica.com/86/2286-004-51ACEA26/Flag-Malta.jpg"},
        {name: "Marshall Islands", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flag_of_the_Marshall_Islands.svg/1200px-Flag_of_the_Marshall_Islands.svg.png"},
        {name: "Mauritania", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Mauritania.svg/1200px-Flag_of_Mauritania.svg.png"},
        {name: "Mauritius", flag: "https://www.worldatlas.com/r/w1200/img/flag/mu-flag.jpg"},
        {name: "Mexico", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1200px-Flag_of_Mexico.svg.png"},
        {name: "Micronesia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Flag_of_the_Federated_States_of_Micronesia.svg/1200px-Flag_of_the_Federated_States_of_Micronesia.svg.png"},
        {name: "Moldova", flag: "https://cdn.britannica.com/10/6210-004-F4DE7D8D/Flag-Moldova.jpg"},
        {name: "Monaco", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Monaco.svg/1200px-Flag_of_Monaco.svg.png"},
        {name: "Mongolia", flag: "https://cdn.britannica.com/56/2756-004-54509464/Flag-Mongolia.jpg"},
        {name: "Montenegro", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Flag_of_Montenegro.svg/1200px-Flag_of_Montenegro.svg.png"},
        {name: "Morocco", flag: "https://www.worldatlas.com/r/w1200/img/flag/ma-flag.jpg"},
        {name: "Mozambique", flag: "https://cdn.britannica.com/23/4223-004-76407A84/Flag-Mozambique.jpg"},
        {name: "Myanmar", flag: "https://cdn.britannica.com/34/4034-004-B478631E.jpg"},
        {name: "Namibia", flag: "https://cdn.britannica.com/25/4225-004-E2FF6664/Flag-Namibia.jpg"},
        {name: "Nauru", flag: "https://cdn.britannica.com/94/3294-004-8145A150/Flag-Nauru.jpg"},
        {name: "Nepal", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png"},
        {name: "Netherlands", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1200px-Flag_of_the_Netherlands.svg.png"},
        {name: "New Zealand", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/800px-Flag_of_New_Zealand.svg.png"},
        {name: "Nicaragua", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Nicaragua.svg/1200px-Flag_of_Nicaragua.svg.png"},
        {name: "Niger", flag: "https://www.worldatlas.com/r/w1200/img/flag/ne-flag.jpg"},
        {name: "Nigeria", flag: "https://cdn.britannica.com/68/5068-004-72A3F250/Flag-Nigeria.jpg"},
        {name: "Norway", flag: "https://cdn.britannica.com/01/3101-004-506325BB/Flag-Norway.jpg"},
        {name: "Oman", flag: "https://cdn.britannica.com/73/5773-004-F7C13E3D/Flag-Oman.jpg"},
        {name: "Pakistan", flag: "https://cdn.britannica.com/46/3346-004-D3BDE016/flag-symbolism-Pakistan-design-Islamic.jpg"},
        {name: "Palau", flag: "https://cdn.britannica.com/49/3349-004-6152ED8A/Flag-Palau.jpg"},
        {name: "Palestine", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Flag_of_Palestine_-_short_triangle.svg/1280px-Flag_of_Palestine_-_short_triangle.svg.png"},
        {name: "Panama", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag_of_Panama.svg/1200px-Flag_of_Panama.svg.png"},
        {name: "Papua New Guinea", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Flag_of_Papua_New_Guinea.svg/800px-Flag_of_Papua_New_Guinea.svg.png"},
        {name: "Paraguay", flag: "https://www.worldatlas.com/img/flag/py-flag.jpg"},
        {name: "Peru", flag: "https://cdn.britannica.com/48/3448-004-33B5D198/Flag-Peru.jpg"},
        {name: "Philippines", flag: "https://cdn.britannica.com/73/3473-004-6E573BFA/Flag-Philippines.jpg"},
        {name: "Poland", flag: "https://www.worldatlas.com/img/flag/pl-flag.jpg"},
        {name: "Portugal", flag: "https://www.worldatlas.com/img/flag/pt-flag.jpg"},
        {name: "Puerto Rico", flag: "https://www.worldatlas.com/r/w1200/img/flag/pr-flag.jpg"},
        {name: "Qatar", flag: "https://cdn.britannica.com/76/5776-004-54A070FA/Flag-Qatar.jpg"},
        {name: "North Macedonia", flag: "https://cdn.britannica.com/08/6208-004-61460B40/Flag-North-Macedonia.jpg"},
        {name: "Romania", flag: "https://cdn.britannica.com/13/6213-050-374AB4AF/Flag-Romania.jpg?w=400&h=235&c=crop"},
        {name: "Russia", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/800px-Flag_of_Russia.svg.png"},
        {name: "Rwanda", flag: "https://www.worldatlas.com/r/w1200/img/flag/rw-flag.jpg"},
        {name: "Saint Kitts and Nevis", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Saint_Kitts_and_Nevis.svg/1200px-Flag_of_Saint_Kitts_and_Nevis.svg.png"},
        {name: "Saint Lucia", flag: "https://cdn.britannica.com/24/5124-004-27D02424/Flag-Saint-Lucia.jpg"},
        {name: "Saint Vincent and the Grenadines", flag: "https://www.worldatlas.com/r/w1200/img/flag/vc-flag.jpg"},
        {name: "Samoa", flag: "https://cdn.britannica.com/08/3308-004-EDC8A115/Flag-Samoa.jpg"},
        {name: "San Marino", flag: "https://www.worldatlas.com/img/flag/sm-flag.jpg"},
        {name: "Sao Tome and Principe", flag: "https://cdn.britannica.com/91/7191-004-76522C96/Flag-Sao-Tome-and-Principe.jpg"},
        {name: "Saudi Arabia", flag: "https://cdn.britannica.com/79/5779-004-DC479508/Flag-Saudi-Arabia.jpg"},
        {name: "Senegal", flag: "https://www.worldatlas.com/r/w1200/img/flag/sn-flag.jpg"},
        {name: "Serbia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/1200px-Flag_of_Serbia.svg.png"},
        {name: "Seychelles", flag: "https://cdn.britannica.com/93/4093-004-A9F95AC3/Flag-Seychelles.jpg"},
        {name: "Sierra Leone", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Sierra_Leone.svg/1280px-Flag_of_Sierra_Leone.svg.png"},
        {name: "Singapore", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1200px-Flag_of_Singapore.svg.png"},
        {name: "Slovakia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/800px-Flag_of_Slovakia.svg.png"},
        {name: "Slovenia", flag: "https://www.worldatlas.com/r/w1200/img/flag/si-flag.jpg"},
        {name: "Solomon Islands", flag: "https://cdn.britannica.com/98/3298-004-5CE240EE/Flag-Solomon-Islands.jpg"},
        {name: "Somalia", flag: "https://cdn.britannica.com/18/18-004-43399622/Flag-Somalia.jpg"},
        {name: "South Africa", flag: "https://cdn.britannica.com/27/4227-004-32423B42/Flag-South-Africa.jpg"},
        {name: "South Sudan", flag: "https://cdn.britannica.com/37/150637-004-5D1F2321/Bandera-de-Sudan-del-Sur.jpg"},
        {name: "Spain", flag: "https://www.worldatlas.com/img/flag/es-flag.jpg"},
        {name: "Sri Lanka", flag: "https://www.worldatlas.com/img/flag/lk-flag.jpg"},
        {name: "Sudan", flag: "https://www.worldatlas.com/img/flag/sd-flag.jpg"},
        {name: "Suriname", flag: "https://www.worldatlas.com/img/flag/sr-flag.jpg"},
        {name: "Sweden", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png"},
        {name: "Switzerland", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/512px-Flag_of_Switzerland.svg.png"},
        {name: "Syria", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flag_of_Syria.svg/1200px-Flag_of_Syria.svg.png"},
        {name: "Tajikistan", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Tajikistan.svg/800px-Flag_of_Tajikistan.svg.png"},
        {name: "Tanzania", flag: "https://cdn.britannica.com/20/20-004-EB20A026/Flag-Tanzania.jpg"},
        {name: "Thailand", flag: "https://cdn.britannica.com/38/4038-004-111388C2/Flag-Thailand.jpg"},
        {name: "Timor-Leste", flag: "https://cdn.britannica.com/60/72760-050-4F87197C/Flag-of-East-Timor.jpg"},
        {name: "Togo", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Flag_of_Togo.svg/1200px-Flag_of_Togo.svg.png"},
        {name: "Tonga", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Tonga.svg/1280px-Flag_of_Tonga.svg.png"},
        {name: "Trinidad and Tobago", flag: "https://cdn.britannica.com/28/5128-004-2809EB66/Flag-Trinidad-and-Tobago.jpg"},
        {name: "Tunisia", flag: "https://cdn.britannica.com/41/3041-004-F1D6DEFC/Flag-Tunisia.jpg"},
        {name: "Turkey", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png"},
        {name: "Turkmenistan", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Turkmenistan.svg/640px-Flag_of_Turkmenistan.svg.png"},
        {name: "Tuvalu", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tuvalu.svg/1200px-Flag_of_Tuvalu.svg.png"},
        {name: "Uganda", flag: "https://www.worldatlas.com/img/flag/ug-flag.jpg"},
        {name: "Ukraine", flag: "https://cdn.britannica.com/14/4814-004-7C0DF1BB/Flag-Ukraine.jpg"},
        {name: "United Arab Emirates", flag: "https://www.worldatlas.com/r/w1200/upload/f4/a6/ab/uae-flag.png"},
        {name: "United Kingdom", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png"},
        {name: "United States", flag: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"},
        {name: "Uruguay", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/1200px-Flag_of_Uruguay.svg.png"},
        {name: "Uzbekistan", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/1280px-Flag_of_Uzbekistan.svg.png"},
        {name: "Vanuatu", flag: "https://www.worldatlas.com/r/w1200/img/flag/vu-flag.jpg"},
        {name: "Venezuela", flag: "https://www.worldatlas.com/img/flag/ve-flag.jpg"},
        {name: "Vietnam", flag: "https://cdn.britannica.com/41/4041-004-D051B135/Flag-Vietnam.jpg"},
        {name: "Yemen", flag: "https://cdn.britannica.com/85/5785-004-B65441FA/Flag-Yemen.jpg"},
        {name: "Zambia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/2560px-Flag_of_Zambia.svg.png"},
        {name: "Zimbabwe", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Flag_of_Zimbabwe.svg/1200px-Flag_of_Zimbabwe.svg.png"}
    ];

    if(guessingCountry) {
        if(message.author.id !== guesserId) return;
        if(message.content.toLowerCase() === correctCountryName.toLowerCase()) {
            message.react('✅')
            message.reply(`✅ Correct! The correct answer was **${correctCountryName}**!`)
        } else{
            message.react('❌')
            message.reply(`❌ Wrong! The correct answer was **${correctCountryName}**!`)
        }
        guessingCountry = false;
        isTimer = false;
    }

    if(murdingChildren) {
        if(message.author.id !== stackerId) return;

        if(message.content >= 3){
            message.reply('Invalid number! Try again.')
            murdingChildren = false;
            return;
        } 

        if(stackedCountries.highscore > highscore.highscore){
            stackedCountries.record = message.member.user.tag;
            fs.writeFile("./highscore.json", JSON.stringify(stackedCountries), (err) => {})
            highscore = JSON.parse(fs.readFileSync("./highscore.json", { encoding: "utf-8", flag: "r" }))
        }

        let death = Math.floor(Math.random() * 5);

        if(message.content === correctChild) {
            let country = Math.floor(Math.random() * countries.length)
            stackedCountries.highscore++;
            message.react('✅')
            message.reply(`✅ You have successfully murded a child! The stacked countries count is now **${stackedCountries.highscore}**. The country you just stacked was **${countries[country].name}!**`)
        } else if(stackedCountries.highscore === 0 && message.content !== correctChild) {
            message.react('❌')
            message.reply(`❌ You have failed to murd the child! Please try again!`)
        } else if(message.content !== correctChild && death === 0){
            stackedCountries.highscore = 0;
            message.react('❌')
            message.reply(`❌ You have failed to murd the child! **OH NO!** Your stacked countries have collapsed. Please try again!`)
        } else if(message.content !== correctChild && death !== 0){
            stackedCountries.highscore--;
            message.react('❌')
            message.reply(`❌ You have failed to murd the child! One country has fallen off the stack. You now have **${stackedCountries.highscore}** countries stacked.`)
        }
        murdingChildren = false;
        isTimer2 = false;
    }
    //#endregion
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
        .setThumbnail('https://i.imgur.com/mU0RScm.png')
        .addFields(
            { name: 'General', value: 
            `- Prefix \`(${config.prefix}prefix)\`\n- API Ping \`(${config.prefix}ping)\`\n- About FHDBot \`(${config.prefix}about)\`\n- Invite FHDBot \`(${config.prefix}invite)\`\n- Date/Time/Unix Timestamp \`(${config.prefix}time)\``},
            { name: 'Fun', value: 
            `- Shipping \`(${config.prefix}ship <arg1> <arg2>)\`\n- PP Size \`(${config.prefix}pp [user])\`\n- Who Asked? \`(${config.prefix}whoasked)\` OR \`(${config.prefix}wh0asked)\`\n- Magic 8 Ball \`(${config.prefix}8ball <question>)\`\n- Guess the Flag \`(${config.prefix}guess)\`\n- Stack the Countries \`(${config.prefix}stack)\` & Stack the Countries Highscore \`(${config.prefix}stackhs)\``}
        )
        .setTimestamp()
        .setFooter({ text: 'FHDBot', iconURL: 'https://i.imgur.com/mU0RScm.png' });
        message.reply({ embeds: [helpEmbed]});

    } 
    
    if(command === `${config.prefix}ownerhelp`){
        if (!message.content.startsWith(config.prefix)) return
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
    //#region (pp size)
    const ppbar = ['You have no PP 🙁','8D','8=D','8==D','8===D','8====D','8=====D','8======D','8=======D','8========D','8=========D','8==========D','8===========D','8============D','8=============D','8==============D','8===============D','8================D','8=================D','8==================D','8===================D','8====================D']
    if(command.startsWith(`${config.prefix}pp`)){
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
    //#region (countries guessing)
    if(command === `${config.prefix}guess`) {
        let country = Math.floor(Math.random() * countries.length)
        let flag = countries[country].flag
        
        let reply = new MessageEmbed()
        .setTitle("Guess the country!")
        .setImage(flag)
        .setColor("RANDOM")
        
        message.reply({ embeds: [ reply ] })
        correctCountryName = countries[country].name
        guessingCountry = true;
        guesserId = message.author.id;
        if(!isTimer){
            isTimer = true;
            function timer(countdown){
                if(!isTimer) return;
                if(countdown === 0){
                    message.channel.send(`**Time's Up!** The correct answer was **${correctCountryName}!**`)
                    isTimer = false;
                    guessingCountry = false;
                    return;
                }
                setTimeout(timer, 1000, countdown-1)
            }
            timer(20);
        }
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
        }, 3000);
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

    if(command === `${config.prefix}stackhs`){
        message.reply(`The current high score for country stacking is **${highscore.highscore} countries,** held by **${highscore.record}.**`)
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
            if(message.author.id === config.ownerid){
                spamming = true;
                function spammer(){
                    if(spamming){
                        if(!spamming) return;
                        client.users.fetch(`${args[0]}`, false).then((user) => {
                            user.send(stringinput).then(console.log).catch(console.error);
                        }).then(console.log).catch(console.error);
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
client.on('messageCreate', (message) => {
    if(message.author.id === client.user.id) return;
    function getRandomItem(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const item = arr[randomIndex];
        return item;
    }

    let words = ['ratio', 'can pooper', 'bozo']
    let randomNumber = Math.floor(Math.random() * 21);

    for (let i = 0; i < words.length; i++) {
        if (message.content.toLowerCase().includes(words[i])) {
          if(message.author.id === "628672513345454122" || message.author.id === "963533621812158474") return;
          message.reply('shut up bozo')
          message.react("🤡").catch(console.error); message.react("🤓").catch(console.error);
          break;
        }
    }

    if(message.content.toLowerCase().includes('your')){
        randomNumber = Math.floor(Math.random() * 6);
        console.log('Your detector: ' + randomNumber)
        if(randomNumber === 0){
            message.reply("you're*")
        }
    } else if(message.content.toLowerCase() === 'who'){
        randomNumber = Math.floor(Math.random() * 4);
        console.log('Who asked detector: ' + randomNumber)
        if(randomNumber === 0){
            message.reply("asked")
        }
        if(randomNumber === 1){
            message.reply("cares")
        }
    } else if(message.content.toLowerCase() === 'what'){
        randomNumber = Math.floor(Math.random() * 2);
        console.log('What ever detector: ' + randomNumber)
        if(randomNumber === 0){
            message.reply("ever")
        }
    }
});
//#endregion