const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(![(ayar.teyitçi)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let embed = new MessageEmbed()
    .setTitle(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setColor("RANDOM")
      let data = db.get(`isimler.${member.id}`);
    let listedData = data.length > 0 ? data.map((losxstg, losxstg2) => `\`${losxstg2 + 1}.\` ${losxstg.guildName} ismiyle ${message.guild.members.cache.has(losxstg.Yetkili) ? message.guild.members.cache.get(losxstg.yetkili) : "Bulunamadı."} tarafından **${losxstg.rol}** olarak kaydedildi.`) : "Bu Üyenin İsim Geçmişi Bulunamadı.";
    message.channel.send(embed.setDescription(`${listedData.join("\n")}`)
    .setFooter("Losint ❤️ Striga"));

    
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["isimler"],
    permLevel: 0
};

exports.help = {
    name: "isimler"
}

