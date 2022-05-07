const db = require('quick.db');
const Discord = require('discord.js');

module.exports.run = async (discordClient, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Você não possui permissão para utilizar este comando.`)

        if (args[0] == "all") {
            let tempo_all = db.all().map(entry => entry.ID).filter(id => id.startsWith(`tempocall_`))

            tempo_all.forEach(db.delete)

            let embed = new Discord.MessageEmbed()
                .setTitle('Resetado!')
                .setDescription(`O tempo call de todos os usuários do servidor foram resetados por ${message.member}!`)
                .setColor("RANDOM")
            message.reply(embed)
        } else {

            let usuario = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

            if (!usuario) return message.reply({ embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#7802ff")
                        .setDescription(`Este usuário não foi encontrado no servidor! **Mencione um usuário/id**, ou selecione **"all"** para resetar o tempo call de todos os usuários!`)
                ]})

            db.set(`tempocall_${usuario.id}`, 0)

            let embed = new Discord.MessageEmbed()
                .setTitle('Resetado!')
                .setDescription(`O tempo call de ${usuario} foi resetado por ${message.member}`)
                .setColor("#7802ff");
            message.reply(embed)
        }

}