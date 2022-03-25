const Discord = require('discord.js');
const discordClient = new Discord.Client();

const express = require('express');
const {response} = require("express");
const AutoRole = require("./src/BotModules/AutoRole");
const TwitterNotification = require("./src/BotModules/TwitterNotification");
const app = express();
const port = process.env.PORT || 5000;

const Prefix = "-"

const AUTH_TOKEN = process.env.SHAMSHER_TOKEN;



async function main() {
    discordClient.login(AUTH_TOKEN)
        .then(console.log)
        .catch(err => console.log(err.message))

    discordClient.on('ready', async () => {
        console.info(`Logged in as ${discordClient.user.tag}!`);

        AutoRole
            .init(discordClient)
            .then()
            .catch()

        TwitterNotification
            .init(discordClient)
            .then()
            .catch()

    });


}

main().then()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


discordClient.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(Prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${discordClient.user.id}>`) || message.content.startsWith(`<@${discordClient.user.id}>`)) return;

    const args = message.content
        .trim().slice(Prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./src/Commands/${command}.js`)
        commandFile.run(discordClient, message, args);
    } catch (err) {
        console.error('Erro:' + err);
    }
});