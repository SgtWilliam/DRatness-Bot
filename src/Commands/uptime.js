const Discord = require("discord.js");

module.exports.run = async (discordClient, message, args) => {
    let totalSeconds = discordClient.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let uptime = `🔖 ${days.toFixed()} dias\n⏰ ${hours.toFixed()} horas\n⌚ ${minutes.toFixed()} minutos\n⏱️ ${seconds.toFixed()} segundos`;

    const embed = new Discord.MessageEmbed()
        .setTitle(`Tempo de atividade 📝`)
        .setThumbnail("https://gifimage.net/wp-content/uploads/2018/06/watch-gif-7.gif")
        .setColor("#FF0000")
        .setDescription(`**Estou online há:**\n${uptime}`)
        .setFooter("...don't worry, be rat! 🐭")

    await message.channel.send(embed);
};