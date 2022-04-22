const Discord = require("discord.js");


module.exports.run = async (discordClient, message, args) => {


    const SentSuggestion = args.join(' ')
    const ChannelToSendSugest = discordClient.channels.cache.get('960633893545996368')
    let Author_Tag = message.author.tag;
    let MessageAuthor = message.author;
    let MessageAuthorID = message.author.id;
    let Author_Avatar = message.author.avatarURL({ dynamic: true, format: "png", size: 1024 });



    let msg_embed = new Discord[`MessageEmbed`]()
        .setColor("#f50909")
        .setAuthor(`Denuncia feita por: ${Author_Tag}`, Author_Avatar)
        .setDescription(SentSuggestion)
        .setFooter(`Id do usuario: ${MessageAuthorID}`)


    const msg_embed_send_to_user_success = new Discord[`MessageEmbed`]()
        .setColor("#09f50d")
        .setAuthor(`✅ ${Author_Tag} sua denuncia foi realizada com sucesso!`, Author_Avatar)


    const msg_embed_send_to_user_error = new Discord[`MessageEmbed`]()
        .setColor("#f50909")
        .setAuthor(`✅ ${Author_Tag} Escreva sua denuncia apos o comando!`, Author_Avatar)
        .addFields(
            {
                name: "Exemplo:",
                value: `-denuncia O usuario X está nos ameaçando`,
                inline: false
            })



    if(SentSuggestion === ""){
        await message.author.send(msg_embed_send_to_user_error)
        message.delete().catch(O_o => {});
        return
    } else {

        ChannelToSendSugest.send(msg_embed).then(msg => {
            let EmojiPositivo = "✅";
            msg.react(EmojiPositivo)
        })

    }
    await message.author.send(msg_embed_send_to_user_success)
    message.delete().catch(O_o => {});
}