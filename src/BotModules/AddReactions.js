
const AddReactions = {

    async init(discordClient) {

        discordClient.on('message', message => {


//Chat Avisos
            if(message.channel.id === "946516262291394696") {
                message.react(message.guild.emojis.cache.find(e => e.name == "picapauuuu")).catch(console.err);
                message.react(message.guild.emojis.cache.find(e => e.name == "RatPItzza")).catch(console.err);
            }


        });




    }
}

module.exports = AddReactions