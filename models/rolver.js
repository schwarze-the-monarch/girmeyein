const Discord = require("discord.js")

exports.run = async (client, message, args) => {
let mem = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || (["all","herkes"].includes(args[0]))
let arerol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(a=>a.name === args[2]) 
let eksil = ["remove","eksilt","sil","-"]
let tümünüsil = ["hepsinisil","removeall","temizle"]
let ekle = ["ekle","add","+"]

const are = new Discord.MessageEmbed()
.setTitle("Komut: !rol")
.setDescription(`
**Açıklama:** Bir kullanıcıya rol veya roller ekleme / kaldırmaya yarar.
**Alt Komutlar:**
!rol ekle - Kullanıcıya belirtilen rolü ekler.
!rol sil - Kullanıcıdaki rollerden belirtilen rolü alır.
!rol hepsinisil - Kullanıcıdaki bütün rolleri alır.
!rol herkes - Belirtilen rolü bütün herkesten eksiltir veya ekler.

**Kullanım:**
!rol ekle [kullanıcı] [rol]
!rol sil [kullanıcı] [rol]
!rol hepsinisil [kullanıcı]
!rol herkes (+/-)[rol]
`)
  if (!eksil.includes(args[0]) && !tümünüsil.includes(args[0]) && !ekle.includes(args[0]) && !["all","herkes"].includes(args[0])) return message.channel.send(are)
  
  if (ekle.includes(args[0])) {
    if (!mem) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Kullanıcıyı bulamıyorum."))
    if (!arerol) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Rolü bulamıyorum."))
    if (mem.roles.cache.has(arerol.id)) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Kullanıcıda belirtilen rol zaten bulunmakta."))
    if (message.guild.members.cache.get(client.user.id).roles.highest.position < arerol.position) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Belirtilen rol benim rolümün üstünde olduğu için kullanıcıya rolü veremedim."))
    mem.roles.add(arerol.id)
    message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`:white_check_mark: Kullanıcıya başarıyla ${arerol.toString()} rolü verildi.`))
  } else if (tümünüsil.includes(args[0])) {
        if (!mem) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Kullanıcıyı bulamıyorum."))
        message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`:white_check_mark: Kullanıcıdan ${mem.roles.cache.filter(a=> a.position < message.guild.members.cache.get(client.user.id).roles.highest.position && a.name !== "@everyone").size} adet rol alındı.`))
    mem.roles.cache.filter(a=> a.position < message.guild.members.cache.get(client.user.id).roles.highest.position && a.name !== "@everyone").forEach(a=>mem.roles.remove(a.id))
  } else if (eksil.includes(args[0])) {
        if (!mem) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Kullanıcıyı bulamıyorum."))
        if (!arerol) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Rolü bulamıyorum."))
        if (!mem.roles.cache.has(arerol.id)) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Kullanıcıda belirtilen rol zaten bulunmamakta."))
        if (message.guild.members.cache.get(client.user.id).roles.highest.position < arerol.position) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Belirtilen rol benim rolümün üstünde olduğu için kullanıcıdan rolü alamadım."))
      mem.roles.remove(arerol.id)
    message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`:white_check_mark: Kullanıcıdan başarıyla ${arerol.toString()} rolü alındı.`))
  } else if (["all","herkes"].includes(args[0])) {
    if (args[1] == "+" || args[1].startsWith("+")) {
        let efe = args.slice(0).join(" ")
        let bilmefe = efe.split("+")
        let codare = message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(a=> a.name === args[2]) || message.guild.roles.cache.get(bilmefe[1]) || message.guild.roles.cache.find(a=> a.name === bilmefe[1]) || message.mentions.roles.first()
        if (!codare) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Rolü bulamıyorum."))
         if (message.guild.members.cache.get(client.user.id).roles.highest.position < codare.position) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Belirtilen rol benim rolümün üstünde olduğu için kullanıcılara rolü veremedim."))
let arr = []
        message.channel.send(new Discord.MessageEmbed().setColor("BLUE").setDescription(`:timer: ${message.guild.members.cache.filter(a=> !a.roles.cache.has(codare.id)).size} Kişiye ${codare.toString()} rolü ${message.guild.members.cache.filter(a=> !a.roles.cache.has(codare.id)).size * 2} saniyede verilmeye çalışılıyor...`))
        message.guild.members.cache.filter(a=> !a.roles.cache.has(codare.id)).map(a=> {
arr.push(a.id)
        })
for (let i=0; i < message.guild.members.cache.filter(a=> !a.roles.cache.has(codare.id)).size; i++) {
   task(i); 
} 
  let sayi = message.guild.members.cache.filter(a=> !a.roles.cache.has(codare.id)).size
function task(i) { 
  setTimeout(function() { 
      message.guild.members.cache.get(arr[i]).roles.add(codare.id)
  }, 2000 * i); 
} 
  setTimeout(function() { 
      message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`:white_check_mark: ${sayi} adet kullanıcıya başarıyla ${codare.toString()} rolü ${sayi * 2} saniyede verildi.`))
  }, 2000 * message.guild.members.cache.filter(a=> !a.roles.cache.has(codare.id)).size); 
  } else if (args[1] == "-" || args[1].startsWith("-")) {
        let efe = args.slice(0).join(" ")
        let bilmefe = efe.split("-")
        let codare = message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(a=> a.name === args[2]) || message.guild.roles.cache.get(bilmefe[1]) || message.guild.roles.cache.find(a=> a.name === bilmefe[1]) || message.mentions.roles.first()
        if (!codare) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Rolü bulamıyorum."))
         if (message.guild.members.cache.get(client.user.id).roles.highest.position < codare.position) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Belirtilen rol benim rolümün üstünde olduğu için kullanıcılardan rolü alamadım."))
let arr = []
        message.channel.send(new Discord.MessageEmbed().setColor("BLUE").setDescription(`:timer: ${message.guild.members.cache.filter(a=> a.roles.cache.has(codare.id)).size} Kişiden ${codare.toString()} rolü ${message.guild.members.cache.filter(a=> a.roles.cache.has(codare.id)).size * 2} saniyede alınmaya çalışılıyor...`))
        message.guild.members.cache.filter(a=> a.roles.cache.has(codare.id)).map(a=> {
arr.push(a.id)
        })
for (let i=0; i < message.guild.members.cache.filter(a=> !a.roles.cache.has(codare.id)).size; i++) {
   task(i); 
} 
  let sayi = message.guild.members.cache.filter(a=> a.roles.cache.has(codare.id)).size
function task(i) { 
  setTimeout(function() { 
      message.guild.members.cache.get(arr[i]).roles.remove(codare.id)
  }, 2000 * i); 
} 
  setTimeout(function() { 
      message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`:white_check_mark: ${sayi} adet kullanıcıdan başarıyla ${codare.toString()} rolü ${sayi * 2} saniyede alındı.`))
  }, 2000 * message.guild.members.cache.filter(a=> a.roles.cache.has(codare.id)).size); 
   } else { message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(":x: Herkese rol verilmesi veya alınması için **+** veya **-** yazmalısın.")) }
  } 
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["role"],
  permLevel: 3,
  kategori: "mod"
};

exports.help = { 
	name: 'rol', 
  description: "Belirttiğiniz kişiye/sunucudaki herkese belirtilen rolü verir.",
  usage: 'rol  '
}
