const Discord = require("discord.js");


const SaidaLog = {

    async init(discordClient, Discord) {



        discordClient.on('guildMemberRemove', async (member) => {

            let canaladeus = discordClient.channels.cache.get('966744142321426442');

            if (canaladeus === null || canaladeus === false) return;

            let embed = new Discord.MessageEmbed()
                .setAuthor( member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`O membro ${member.user} saiu do servidor. 😭`)
                .setColor('00001');


            canaladeus.send(embed)

        })

    }

}

module.exports = SaidaLog