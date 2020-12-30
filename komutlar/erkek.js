const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
if(![(ayar.teyitçi)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 

  
//KANALLAR VE ROLLER + TAG
let tag = (ayar.tag)
const kayıtlı = (ayar.erkekrol)
const kayıtsız = (ayar.kayitsiz)
const chat = (ayar.chat)
const kanal = (ayar.kayıtkanal)
const savelog = (ayar.savelog)
const emoji = message.guild.emojis.cache.find(r => r.name === 'EMOJI ISIM')

if(!kayıtlı) return message.reply('Kayıtlı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Kayıtsız Rolü Ayarlanmamış.') 
  
  
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if(!member) return message.channel.send('Kimi Kayıt Etmem Gerekiyor ?')
let losxstg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('İsim Belirt.')
if(!yas) return message.reply('Yaş Belirt.')
  
  
//İSİM - ROL DEĞİŞME
losxstg.setNickname(`${tag} ${isim} | ${yas}`)  
losxstg.roles.add(kayıtlı)
losxstg.roles.remove(kayıtsız)

//DB LER
db.add(`yetkili.${message.author.id}.toplam`, 1)
db.add(`yetkili.${message.author.id}.erkek`, 1)
let kayıtlar = db.get(`yetkili.${message.author.id}.toplam`);
let erkek = db.fetch(`yetkili.${message.author.id}.erkek`); 
     db.push(`isimler.${losxstg.id}`, {
    guildName: `${tag} ${isim} | ${yas}`,
    isim: isim,
    yas: yas,
    yetkili: message.author.id,
    rol: "Erkek"
});
  
//CHAT EMBED
const chatembed = new MessageEmbed()
  .setColor("ffffff")
  .setDescription(`<@${losxstg.user.id}> Aramıza Hoşgeldin, Keyifli Vakitler Geçirmeni Dilerim.`)
chat.send(chatembed)
  
  
//REGİSTER CHAT EMBED
const embed = new MessageEmbed()
.setTitle(`Kayıt İşlemi Tamamlandı`)
    .addField(`• Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`• Kayıt Edilen:`, `<@${losxstg.user.id}> Kayıt Oldu`)
    .addField(`• Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
    .addField(`• Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
    .addField(`• Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
    .addField(`• Yetkili Toplam:`, `\`${kayıtlar}\` Kayıda Sahip.`)
.setFooter(`Losint 🧡 Striga`)
.setColor('BLUE')
message.react(emoji)
kanal.send(embed)
  
//SAVE LOG EMBED
const embed2 = new MessageEmbed()
  .setTitle(`Kayıt İşlemi Tamamlandı`)
  .addField(`• Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
  .addField(`• Kayıt Edilen:`, `<@${losxstg.user.id}> Kayıt Oldu`)
  .addField(`• Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
  .addField(`• Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
  .addField(`• Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
  .addField(`• Yetkili Toplam:`, `\`${kayıtlar}\` Kayıda Sahip.`)
  .setFooter(`Losint 🧡 Striga`)
  .setColor('BLUE')
savelog.send(embed)

//DM LOG EMBED
const embed3 = new MessageEmbed()
  .setTitle(`Kayıt İşlemi Tamamlandı`)
  .setDescription(`\`${message.guild.name}\` Sunucusunda, <@${message.author.id}> Tarafından Kaydedildin.
  İsmin \`${tag} ${isim} | ${yas}\` Olarak Değiştirildi.`)
  .setFooter(`Eğer Yanlışlık Varsa Yetkililere Bildir.`)
  .setColor('BLUE')
member.send(embed3)
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek", "e", "man", "boy"],
    permLevel: 0
};

exports.help = {
    name: "erkek"
}

