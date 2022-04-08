const Discord = require("discord.js");


module.exports.run = async (discordClient, message, args) => {


    const SentSuggestion = args.join(' ')
    const ChannelToSendSugest = discordClient.channels.cache.get('960633424593432596')
    let Author_Tag = message.author.tag;
    let MessageAuthor = message.author;
    let MessageAuthorID = message.author.id;
    let Author_Avatar = message.author.avatarURL({ dynamic: true, format: "png", size: 1024 });

    if(SentSuggestion === ""){
        message.channel.send("Escreva sua sugestão apos o comando!")
    } else {

        let msg_embed = new Discord[`MessageEmbed`]()
            .setColor("#a609f5")
            .setAuthor(`Sugestão feita por: ${Author_Tag}`, Author_Avatar)
            .setDescription(SentSuggestion)
            .setFooter(`Id do usuario: ${MessageAuthorID}`)


        ChannelToSendSugest.send(msg_embed).then(msg => {
            let EmojiPositivo = "✅";
            let EmojiNegaivo = "❌";
            msg.react(EmojiPositivo)
            msg.react(EmojiNegaivo)
            message.channel.send(`✅ ${MessageAuthor} Sua sugestão foi enviada com sucesso, Obrigado pela sugestão! :)`)
        })

    }

}