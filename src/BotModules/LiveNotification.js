const {CronJob} = require("cron");
const {MessageEmbed} = require('discord.js');
const TwitchRepository = require("../Repository/TwitchRepository");
const Streamer = require("../Repository/Streamers");
const LIVE_NOTIFICATION_CHANNEL_ID = process.env.LIVE_NOTIFICATION_CHANNEL_ID;


const LiveNotification = {

    async init(discordClient) {
        LiveOnJob(discordClient).start()
    }
}

function LiveOnJob(discordClient) {

    return new CronJob(
        '*/2 * * * *',
        () => {
            findStreamersToNotifyLiveOn(discordClient)
                .then()
                .catch(reason => console.log(reason.toString()))
        },
        null,
        true,
        'America/Los_Angeles'
    );
}

async function findStreamersToNotifyLiveOn(discordClient) {

    for (const streamer of Streamer.all()) {
        if (await isWillNotifyLiveOn(streamer)) {
            await notifyLive(streamer, discordClient)
        }
    }

}

async function notifyLive(streamer, discordClient) {
    const messageEmbed = await buildLiveNotificationMessageEmbed(streamer)
    const channel = discordClient.user.client.channels.cache.get(`${LIVE_NOTIFICATION_CHANNEL_ID}`)
    channel.send(`@everyone`, messageEmbed);
}

async function isWillNotifyLiveOn(streamer) {
    const wasStartedAtMoreThanX = await TwitchRepository.wasStartedAtMoreThan(2, streamer)
    return !wasStartedAtMoreThanX;
}

async function buildLiveNotificationMessageEmbed(streamerUsername) {

    const streamUser = await TwitchRepository.getUser(streamerUsername)
    const stream = await TwitchRepository.getStream(streamUser)

    if (!streamUser || !stream) {
        return
    }

    const thumbURL = stream.thumbnailUrl
        .replace(`{width}`, `854`)
        .replace(`{height}`, `480`)

    return new MessageEmbed()
        .setAuthor(`A LIVE DO ${streamUser.displayName.toUpperCase()} ESTÁ ON GUYS!!!`, `${streamUser.profilePictureUrl}`)
        .setColor('#521570')
        .setURL(`https://www.twitch.tv/${streamUser.name}`)
        .setTitle(`${stream.title}`)
        .setDescription(`
        Bora ninhada, fortalecer o corre dos nossos ídolos!`)
        .setImage(thumbURL)
        .setTimestamp()
        .setFooter(`🐭 Don't worry, be rat! 🐭`, `https://i.imgur.com/lXfHvGD.png`)
}

module.exports = LiveNotification
