const Twit = require('twit');
const Discord = require('discord.js');
const TWITTER_DiscordChannelID = process.env.TWITTER_DiscordChannelID
const TWITTER_USER_WATCH_ID1 = "1506715692996907017"
const TWITTER_USER_WATCH_ID2 = "1429531043560927253"

const TwitterNotification = {

    async init(discordClient) {

        let TwitterLogin = new Twit({
            consumer_key:         process.env.TWITTER_CONSUMER_KEY,
            consumer_secret:      process.env.TWITTER_CONSUMER_KEY_SECRET,
            access_token:         process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
            timeout_ms:           60*100,  // optional HTTP request timeout to apply to all requests.
            strictSSL:            true,     // optional - requires SSL certificates to be valid.
        })


        //follow = id do usuario do twitter

        var stream = TwitterLogin.stream('statuses/filter', { follow: [TWITTER_USER_WATCH_ID1] })

        stream.on('tweet', function (tweet) {
            //only show owner tweets
            if(tweet.user.id == TWITTER_USER_WATCH_ID1) {
                var url = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
                try {
                    let channel = discordClient.channels.fetch("965715559914291320").then(channel => {
                        channel.send(url)
                    }).catch(err => {
                        console.log(err)
                    })
                } catch (error) {
                    console.error(error);
                }
            }
        })

        var stream = TwitterLogin.stream('statuses/filter', { follow: [TWITTER_USER_WATCH_ID2] })

        stream.on('tweet', function (tweet) {
            //only show owner tweets
            if(tweet.user.id == TWITTER_USER_WATCH_ID2) {
                var url = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
                try {
                    let channel = discordClient.channels.fetch("965715559914291320").then(channel => {
                        channel.send(url)
                    }).catch(err => {
                        console.log(err)
                    })
                } catch (error) {
                    console.error(error);
                }
            }
        })




    }


};



module.exports = TwitterNotification


