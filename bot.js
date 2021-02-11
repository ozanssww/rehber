// Modüller
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');

// Util Dosya İsteği
require('./util/eventLoader')(client);

const log = message => {
  console.log(`${message}`)
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

// ==================================================
// # KOMUTLAR BAŞLANGICI                            #
// # CODED BY KADİRFİ, CODEMAREFİ V12 KAYIT ALTYAPI #
// ==================================================

// Giriş Mesajı & Rol Verme
client.on('guildMemberAdd', async member => {

  // Let Tanımları
  let kanal = "KAYIT KANAL İD";
  let cmfzaman = new Date().getTime() - member.user.createdAt.getTime();
  let cmfzaman2 = new Date().getTime() - member.user.createdAt.getTime()

  // Gerekli Modül
  require("moment-duration-format");

  // Güvenilir & Güvenilir Değil Mesajı
  var CodeMareFi = [];
    if(cmfzaman < 1296000000)
      CodeMareFi = "Güvenilir Değil"
    if(cmfzaman > 1296000000)
      CodeMareFi = "Güvenli"

  // Const Tanımlarımız
  const gecen = moment.duration(cmfzaman2).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 

  // Giriş Mesajımız
  client.channels.cache.get(kanal).send(`
    **${member}(\`${member.id}\`) Sunucumuza hoşgeldin dostum. Seninle birlikte \`${member.guild.memberCount}\` kişi olduk. Ses teyit odalarına geçerek kayıt olabilirsin. Ayrıca tagımızı alarak bize destek olabilirsin \`tag\` :tada:**
    \n
      \t**Hesap açılalı \`${gecen}\` olmuş.**
      \t**Kullanıcı ${CodeMareFi}.**
  `)

  
  // Girişte Kullanıcıya Verilecek Rol(ler)
  member.roles.add('KAYITSIZ ROL İD')

})

client.login(ayarlar.token);