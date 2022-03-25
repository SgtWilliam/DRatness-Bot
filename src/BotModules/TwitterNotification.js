const Twit = require('twit');
const Discord = require('discord.js');


const TwitterNotification = {

    async init(discordClient) {

        let TwitterLogin = new Twit({
            consumer_key:         process.env.TWITTER_CONSUMER_KEY,
            consumer_secret:      process.env.TWITTER_CONSUMER_KEY_SECRET,
            access_token:         process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
            timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
            strictSSL:            true,     // optional - requires SSL certificates to be valid.
        })


        //follow = id do usuario do twitter
        let stream = TwitterLogin.stream('statuses/filter', { follow: "1479190823371694080" })

        stream.on('tweet', function (tweet) {
            //id do usuario do twitter
            if(tweet.user.id == "1479190823371694080") {
                let url = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
                try {
                    let channel = discordClient.channels.fetch("956298650181574716").then(channel => {
                        channel.send(url)
                        console.log(url)
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


