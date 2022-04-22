

const DeletedMessageLog = {

    async init(discordClient, Discord) {

        discordClient.on("messageDelete", async (message) => {

            let channelDellogs = discordClient.channels.cache.get('962112729852825610');
            if (channelDellogs === null) return;

            if (message.author.bot) return;

            let user1 = message.author;
            let channel2 = message.channel;
            let msgDelete = message.content;

            let embed = new Discord.MessageEmbed()
                .setTitle(`🗑 Mensagem excluída`)
                .setColor("#9400D3")
                .addFields(
                    {
                        name: `Autor da mensagem:`,
                        value: `${user1}`,
                        inline: false,
                    },

                )
                .addFields(
                    {
                        name: `Canal:`,
                        value: `${channel2}`,
                        inline: false,
                    },
                )
                .addFields(
                    {
                        name: `Mensagem:`,
                        value: `\`\`\`${msgDelete}\`\`\``,
                        inline: false,
                    }
                )
                .setTimestamp()
                .setFooter( `${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

            try {

                channelDellogs.send(embed)

            } catch (e) { }
        });


    }
}

module.exports = DeletedMessageLog