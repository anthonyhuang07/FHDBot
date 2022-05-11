function resetBot(channel) {
    channel.send('Restarting...')
    .then(msg => client.destroy())
    .then(() => client.login(process.env.DISCORD_TOKEN));
    client.on('ready', function(e){
        console.log('Restarted!');
    });
}
if(msg.content.toLowerCase() === `${prefix}restart`){
    resetBot(msg.channel);
}


