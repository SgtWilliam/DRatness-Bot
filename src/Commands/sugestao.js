module.exports =  {
    name: "sugerir",
    description: "Faça uma sugestão.",
    type: "CHAT_INPUT",
    options: [
        {
            name: "sugestão",
            type: "STRING",
            description: "Escreva sua sugestão.",
            required: true

        }

    ],

    run: async (client, interaction, args) => {

        let canal = "960633424593432596";
        if (canal === false || canal === null) {
            interaction.reply({ content: `Não foi possível enviar sua sugestão, pois o canal de texto de sugestões não está configurado.` })
        } else {
            let sugestao = interaction.options.getString("sugestão");
            let channel = interaction.guild.channels.cache.get(canal);
            let embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp(new Date())
                .setTitle(`Nova sugestão!`)
                .addFields(
                    {
                        name: `\\👤 Autor:`,
                        value: `${interaction.user}`,
                        inline: false
                    },
                    {
                        name: `\\💬 Sugestão:`,
                        value: `${sugestao}`,
                        inline: false
                    }
                );

            channel.send({ embeds: [embed] }).then( () => {
                interaction.reply(`Sua sugestão foi enviada para ${channel} com sucesso.`)
            }).catch(e => {
                interaction.reply(`\\❌ Algo deu errado.`)
            })
        }

    }
}