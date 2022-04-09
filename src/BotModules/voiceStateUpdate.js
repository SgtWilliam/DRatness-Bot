const db = require('quick.db');
const Discord = require("discord.js")


const VoiceStateUpdate = {

    async init(discordClient) {


        discordClient.on("voiceStateUpdate", (oldMember, newMember) => {

            const canal_logs = db.get(`config.${oldMember.guild.id}.tempocall`);

            let usuario = newMember.guild.members.cache.get(newMember.id)

            let oldVoice = oldMember.channel;
            let newVoice = newMember.channel;
            let canal_logs2 = discordClient.channels.cache.get('962112706402484254')
            if (oldVoice == null) {
                let embed = new Discord.MessageEmbed()
                    .setTitle('Entrou no Canal de Voz')
                    .setDescription(`O usuário <@${newMember.id}> entrou no canal de voz ${newMember.channel}.`)
                    .setColor("RANDOM")
                //canal_logs2.send(embed)


                if (db.get(`contando_${newMember.id}`) === false) {
                    db.set(`contando_${newMember.id}`, true)
                    db.set(`call_${newMember.id}`, new Date().getTime())
                    db.set(`contando_${newMember.id}`, true)
                }
            } else if (newVoice == null) {
                let embed = new Discord.MessageEmbed()
                    .setTitle('Saiu do Canal de Voz')
                    .setDescription(`O usuário <@${newMember.id}> saiu do canal de voz ${oldMember.channel}.`)
                    .setColor("RANDOM")
                //canal_logs2.send(embed)


                if (db.get(`contando_${newMember.id}`) === true) {
                    const tempo =  db.get(`call_${newMember.id}`)

                    const start = new Date().getTime();

                    const diff = Math.abs(tempo - start);

                    const tempo2 = Math.ceil(diff / 1000)

                    db.add(`tempocall_${newMember.id}`, tempo2)
                    db.set(`contando_${newMember.id}`, false)
                }
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle('Mudou de Canal de Voz')
                    .setDescription(`O usuário <@${newMember.id}> mudou de canal de voz.`)
                    .addField('Saiu de', `${oldMember.channel}.`, true)
                    .addField('Entrou em', `${newMember.channel}.`, true)
                    .setColor("RANDOM")
                //canal_logs2.send(embed)

            }
            if (newMember.selfMute === true) {
                if (usuario.voice.channel) {
                    if (db.get(`contando_${newMember.id}`) === true) {
                        const tempo =  db.get(`call_${newMember.id}`)
                        const start = new Date().getTime();

                        const diff = Math.abs(tempo - start);
                        const tempo2 = Math.ceil(diff / 1000)

                        db.add(`tempocall_${newMember.id}`, tempo2)
                        db.set(`contando_${newMember.id}`, false)
                        return;
                    } else {
                        return;
                    }
                }
            } else {
                if (usuario.voice.channel) {
                    db.set(`call_${newMember.id}`, new Date().getTime())
                    db.set(`contando_${newMember.id}`, true)
                }
                return;
            }
        })


    }
}

module.exports = VoiceStateUpdate