
const AddReactions = {

    async init(discordClient) {

        discordClient.on('message', message => {

//Chat Avisos
            if(message.channel.id === "881601405201297448") {
                message.react(message.guild.emojis.cache.find(e => e.name == "Queijo")).catch(console.err);
                message.react(message.guild.emojis.cache.find(e => e.name == "Rat")).catch(console.err);
            }
//chat news geral
            if(message.channel.id === "941376628821479445") {
                message.react(message.guild.emojis.cache.find(e => e.name == "Queijo")).catch(console.err);
                message.react(message.guild.emojis.cache.find(e => e.name == "Rat")).catch(console.err);
            }
//chat lives ON
            if(message.channel.id === "939210517963227207") {
                message.react(message.guild.emojis.cache.find(e => e.name == "Queijo")).catch(console.err);
                message.react(message.guild.emojis.cache.find(e => e.name == "Rat")).catch(console.err);
            }
//chat redes Sociais
            if(message.channel.id === "956298650181574716") {
                message.react(message.guild.emojis.cache.find(e => e.name == "Queijo")).catch(console.err);
                message.react(message.guild.emojis.cache.find(e => e.name == "Rat")).catch(console.err);
            }



        });

    }
}

module.exports = AddReactions