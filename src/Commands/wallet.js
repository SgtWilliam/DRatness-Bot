const WarRidersGetWallet = require('../Repository/WarRidersGetWallet')
const Discord = require("discord.js");


module.exports.run = async (discordClient, message, args) => {

    const ReceivedMessage = args.join('');


    async function SendMessage(GetWallet, discordClient, ReceivedMessage) {

            let GetAuthorMessageSend = message.author;
            let CreatEmbedMessage = new Discord.MessageEmbed()
                .setAuthor(`Wallet do ${ReceivedMessage}`)
                .setTitle(`Wallet:`)
                .setDescription(GetWallet)
                .setFooter(`👀`)
                .setColor("#005ce6")
                .setTimestamp()
                .addFields(
                    {
                        name: "Perfil na open sea",
                        value: `[Opensea](https://opensea.io/${GetWallet})`,
                        inline: true
                    },
                    {
                        name: "ETH scan",
                        value: `[ETH-Scan](https://etherscan.io/address/${GetWallet})`,
                        inline: true
                    }
                );

        await message.channel.send(GetAuthorMessageSend, CreatEmbedMessage);
    };



    WarRidersGetWallet
        .GetWallet(ReceivedMessage)
        .then(SendMessage)
        .catch(reason => message.channel.send("Não encontrei esse usuario meu chapa!"))

};
