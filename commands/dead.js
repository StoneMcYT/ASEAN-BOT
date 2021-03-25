const Discord = require('discord.js');
module.exports = {
  name: 'dead',
  description: 'To be send when the Server is offline/crashed',
  execute(message){
const faq1 = new Discord.MessageEmbed()
.setColor('#FF0000')
.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setTitle (':rotating_light: Server has crashed ')
    .addFields( 
      {name:"Please be patient", value: "The server has crashed and our staff is investigating the issue. There is no ETA about when we will be back but we will notify you."},
      )
   .setFooter('Last updated At 9:35pm (GMT +8)','https://images-ext-1.discordapp.net/external/j2-U816cNP_653mZv8L7hc1Q6TN6D9NhahEx5QMjPYs/%3Fsize%3D128/https/cdn.discordapp.com/icons/702883639574396969/0a9741c68d97fd00de8458d20fd9b513.png');
   message.channel.send(faq1);
}
}