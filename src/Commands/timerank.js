const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('milliseconds');

module.exports.run = async (discordClient, message, args) => {

        async function rankTempocall(pagina, per_pagina) {

            const resp = await db.all().filter(data => data.ID.startsWith('tempocall_')).sort((a, b) => b.data - a.data);

            var pagina = pagina || 1,
                per_pagina = per_pagina || 10,
                offset = (pagina - 1) * per_pagina,

                paginatedItems = resp.slice(offset).slice(0, per_pagina),
                total_pagina = Math.ceil(resp.length / per_pagina);

            let id = resp.slice('tempocall_')

            var rankMensagem = ""
            for (var i in paginatedItems) {

                if (paginatedItems[i].data == undefined || paginatedItems[i].data == "") {

                } else {
                    let tempo = paginatedItems[i].data
                    let totalSeconds = (ms.seconds(tempo) / 1000);
                    let hours = Math.floor(totalSeconds / 3600);
                    totalSeconds %= 86400;
                    totalSeconds %= 3600;
                    let minutes = Math.floor(totalSeconds / 60);
                    let seconds = Math.floor(totalSeconds % 60);

                    tempo = "**" + hours + '** hora(s), **' + minutes + '** minuto(s) e **' + seconds + '** segundos';

                    let nick = paginatedItems[i].ID.replace("tempocall_", "")
                    if (message.guild.members.cache.get(nick)) {
                        nick = message.guild.members.cache.get(nick)
                        rankMensagem += `**${nick.user.tag}**\n${tempo}\n\n`;
                    } else {
                    }
                }
            }

            let final = {
                pagina: pagina,
                per_pagina: per_pagina,
                pre_pagina: pagina - 1 ? pagina - 1 : null,
                next_page: (total_pagina > pagina) ? pagina + 1 : null,
                total: resp.length,
                total_pagina: total_pagina,
                data: paginatedItems,
                message: rankMensagem
            };

            if (rankMensagem == undefined || rankMensagem == "") rankMensagem = '**Nenhum usu??rio est?? no top 10!**';

            const topembed = new Discord.MessageEmbed()
                .setColor("#7802ff")
                .setAuthor(message.guild.name + " | Rank Call", message.guild.iconURL({ dynamic: true }) )
                .addField('Top 10 | Tempo em Call', rankMensagem)
                .setFooter( message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            return message.reply(topembed)
        }
        rankTempocall(1, 10)
};