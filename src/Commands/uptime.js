const Discord = require("discord.js");


module.exports.run = async (discordClient, message, args) => {
    let totalSeconds = discordClient.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let uptime = `ð ${days.toFixed()} dias\nâ° ${hours.toFixed()} horas\nâ ${minutes.toFixed()} minutos\nâ±ï¸ ${seconds.toFixed()} segundos`;

    const embed = new Discord.MessageEmbed()
        .setTitle(`Tempo de atividade ð`)
        .setThumbnail("https://gifimage.net/wp-content/uploads/2018/06/watch-gif-7.gif")
        .setColor("#FF0000")
        .setDescription(`**Estou online hÃ¡:**\n${uptime}`)
        .setFooter("...don't worry, be rat! ð­")

    await message.channel.send(embed);
    //message.react(message.guild.emojis.cache.find(e => e.name == "picapauuuu")).catch(console.err);
}