const Discord = require("discord.js");



module.exports.run = async (discordClient, message, args) => {

    const embed = new Discord.MessageEmbed()
        .setTitle(`MultiTwitch`)
        .setThumbnail("https://c.tenor.com/-_kMuKENUbMAAAAC/twitch.gif")
        .setColor("#7802ff")
        .setDescription(``)
        .setFooter("...don't worry, be rat! 🐭")
        .addFields(
            {
                name: "MultiTwitch link",
                value: `[MultiTwitch](https://www.multitwitch.tv/feer1__/k0zero/kayalol1/l3l3fps/pastorfpss/relancefps/roy_dino/takihiro/thedogzeira/thiagokiller1_/tiogust/utinowns/zdexmir4/boizaolol/ratnessclub})`,
                inline: false
            }
        )
       await message.channel.send(embed)
}