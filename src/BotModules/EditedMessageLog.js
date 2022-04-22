


const EditedMessageLog = {

    async init(discordClient, Discord) {


        discordClient.on("messageUpdate", async (message, oldMessage) => {

            let setlogsmsgenv = discordClient.channels.cache.get('962112796168966204');
            if (setlogsmsgenv === null) return;

            if (message.author.bot) return;

            let msgchannel = message.channel;
            let msgantiga = message.content;
            let msgeditada = oldMessage.content;

            let embed = new Discord.MessageEmbed()
                .setTitle(`📝 Mensagem editada`)
                .setColor("#9400D3")
                .addFields(
                    {
                        name: `Autor da mensagem`,
                        value: `${message.author}`,
                        inline: false,
                    },
                )

                .addFields(
                    {
                        name: `Canal`,
                        value: `${msgchannel}`,
                        inline: false,
                    },
                )
                .addFields(
                    {
                        name: `Mensagem antiga`,
                        value: `\`\`\`${msgantiga}\`\`\``,
                        inline: false
                    },
                )
                .addFields(
                    {
                        name: `Mensagem editada`,
                        value: `\`\`\`${msgeditada}\`\`\``,
                        inline: false,
                    }
                )
                .setTimestamp()
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))

            setlogsmsgenv.send(embed)
        });

    }
}

module.exports = EditedMessageLog;