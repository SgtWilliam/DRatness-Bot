const axios = require("axios");
const Discord = require("discord.js");
const discordClient = new Discord.Client();
const ReceivedMessage = require("../Commands/wallet");


const WarRidersGetWallet = {

    async GetWallet(DiscordMessage){
        let response = await axios.get(`https://us-central1-war-riders-account-system.cloudfunctions.net/app/usertoaddress/${DiscordMessage}`);
        return response.data.message
    }
};

/*
WarRidersGetWallet
     .GetWallet("ratneewqeewss006")
     .then(console.log)
     .catch(reason => discordClient.message.channel.send("Não encontrei esse usuario meu chapa!"))
*/

module.exports = WarRidersGetWallet


