const Discord = require('discord.js')
const db = require('quick.db')

    exports.run = async(client, message, args) => {
        if(!message.member.roles.cache.has('807416467372900362')){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`**${message.author} Bu Komutu Kullanmak İçin Gerekli Yetkiye Sahip Değilsin**`)
            .setColor('#ff0000')
            return message.channel.send(cmfhata)
        }

        // Data
        db.get(`erkekkayit_${message.author.id}_${message.guild.id}`)
        db.add(`erkekkayit_${message.author.id}_${message.guild.id}`, +1)

        // Let tanımlarımız
        let kullanıcı = message.mentions.members.first();
        let isim = args[1];
        let yas = args[2];

        // Hata mesajlarımız
        if(!kullanıcı){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Lütfen Kayıt Edilecek Kişiyi Etiketleyiniz.**`)
            .setColor('#ff0000')
            return message.channel.send(cmfhata)
        }
        if(!isim){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Lütfen Kayıt Edilecek Kişinin İsmini Giriniz.**`)
            .setColor('#ff0000')
            return message.channel.send(cmfhata)
        }
        if(!yas){
            const cmfhata = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Lütfen Kayıt Edilecek Kişinin Yaşını Giriniz.**`)
            .setColor('#ff0000')
            return message.channel.send(cmfhata)
        }

        if(kullanıcı && isim && yas){
            kullanıcı.setNickname(isim  + " | "  + yas)
            kullanıcı.roles.add('713061974141042749')
            kullanıcı.roles.add('712361775512944670')
          
            kullanıcı.roles.remove('712358835393659062')

            const basarili = new Discord.MessageEmbed()
            .setDescription(`
                ${kullanıcı}(\`${kullanıcı.id}\`) **Başarıyla <@&713061974141042749> ve <@&712361775512944670> Olarak Kayıt Edildi**
            `)
            .setColor('RANDOM')
            message.channel.send(basarili)
        }
    } // CodeMareFi - MareFi |\_/|

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Erkek','ERKEK','e'],
    permLevel: 0
}

exports.help = {
    name: 'erkek'
}