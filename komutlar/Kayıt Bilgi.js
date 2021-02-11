const Discord = require('discord.js')
const db = require('quick.db')

    exports.run = async(client, message, args) => {
        let member = message.mentions.members.first()

        if(member){
            let erkekkayitsayi = db.fetch(`erkekkayit_${member.id}_${message.guild.id}`)
            let bayankayitsayi = db.fetch(`bayankayit_${member.id}_${message.guild.id}`)
            let toplam = erkekkayitsayi + bayankayitsayi

            const bilgi = new Discord.MessageEmbed()
            .setDescription(`
                ${member}(\`${member.id}\`) Kişisinin Kayıt Bilgileri;

                \`Erkek Kayıt Sayısı\` - ${erkekkayitsayi || 0} | \`Bayan Kayıt Sayısı\` - ${bayankayitsayi || 0} | \`Toplam\` - ${toplam || 0}
            `)
            .setColor('RANDOM')
            .setFooter('Jevoor')
            message.channel.send(bilgi)
        } else {
            let erkekkayitsayi = db.fetch(`erkekkayit_${message.author.id}_${message.guild.id}`)
            let bayankayitsayi = db.fetch(`bayankayit_${message.author.id}_${message.guild.id}`)
            let toplam = erkekkayitsayi + bayankayitsayi

            const bilgi = new Discord.MessageEmbed()
            .setDescription(`
                ${message.author} Kayıt Bilgilerin

                \`Erkek Kayıt Sayısı\` - ${erkekkayitsayi || 0} | \`Bayan Kayıt Sayısı\` - ${bayankayitsayi || 0} | \`Toplam\` - ${toplam || 0}
            `)
            .setColor('RANDOM')
            .setFooter(' 𝐁𝐲 𝔒𝔷𝔞𝔫 ')
            message.channel.send(bilgi)
        }

    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Kayıt-bilgi','KAYIT-BİLGİ','kayıtbilgi', 'kbilgi'],
    permLevel: 0
}

exports.help = {
    name: 'kayıt-bilgi'
}