const TwitterNotification = require("./src/BotModules/TwitterNotification");
const AddReactions = require("./src/BotModules/AddReactions");
const ServerLogs = require("./src/BotModules/voiceStateUpdate");
const EditedMessageLog = require("./src/BotModules/EditedMessageLog");
const DeletedMessageLog = require("./src/BotModules/DeletedMessageLog");
const SaidaLog = require("./src/BotModules/SaidaLog");

const Discord = require('discord.js');
const express = require('express');
const {response} = require("express");
const YoutubePoster = require("discord-yt-poster");
const { Client, Intents, MessageEmbed } = require('discord.js');



//const discordClient = new Discord.Client();
const app = express();
const port = process.env.PORT || 5000;
const AUTH_TOKEN = process.env.SHAMSHER_TOKEN;
const Prefix = "-"

const discordClient = new Discord.Client({intents: 32767})
module.exports = discordClient;



async function main() {
    discordClient.login(AUTH_TOKEN)
        .then()
        .catch(err => console.log(err.message))

    discordClient.on('ready', async () => {
        console.info(`Logged in as ${discordClient.user.tag}!`);


        TwitterNotification
            .init(discordClient)
            .then()
            .catch()


        AddReactions
            .init(discordClient)
            .then()
            .catch()

        ServerLogs
            .init(discordClient)
            .then()
            .catch()


        EditedMessageLog
            .init(discordClient, Discord)
            .then()
            .catch()

        DeletedMessageLog
            .init(discordClient, Discord)
            .then()
            .catch()

        SaidaLog
            .init(discordClient, Discord)
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




//starts
discordClient.on("ready", () => {
    let ferinha = [
            `Mir4 Global`,
            `Gerenciando ${discordClient.users.cache.size} pessoas`,
            `War Riders`
        ],
        fera = 0;
    setInterval(() => discordClient.user.setActivity(`${ferinha[fera++ % ferinha.length]}`, {
        type: "PLAYING" //mais tipos: WATCHING / LISTENING
    }), 1000 * 30);
    discordClient.user
        .setStatus("online")
    console.log("Estou pronto(a) para ser utilizado(a)!")
});
//starts

//slash commands
discordClient.commands = new Discord.Collection();
discordClient.slashCommands = new Discord.Collection();
require("./src/handler")(discordClient);
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

discordClient.on("interactionCreate", async (interaction) => {

    if (!interaction.guild) return;

    if (interaction.isCommand()) {

        const cmd = discordClient.slashCommands.get(interaction.commandName);

        if (!cmd)
            return;

        const args = [];

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(discordClient, interaction, args);
    }

    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = discordClient.slashCommands.get(interaction.commandName);
        if (command) command.run(discordClient, interaction);

    }
});