const axios = require('axios')
const cheerio = require('cheerio')

const URL = "https://forum.mir4global.com/rank?ranktype=1&worldgroupid=15&worldid=189&loaded=1"


module.exports.run = async (discordClient, message, args) => {

async function getPageData(){
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data)

    $(`.ranking_table tbody tr`).each((i, elem) =>{
       const name = $(elem).find('td').last().text()

        console.log(name)
    })

}
getPageData();

}
