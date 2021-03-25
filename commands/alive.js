const Discord = require('discord.js');
module.exports = {
  name: 'alive',
  description: 'To be send when the Server is alive',
  execute(message){
const faq1 = new Discord.MessageEmbed()
.setColor('#008000')
.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setTitle (':green_circle:  Server is back ')
    .addFields( 
      {name:"The server is back", value: "You may start connecting to the server again now!"},
      )
   .setFooter('Last updated Today','https://images-ext-1.discordapp.net/external/j2-U816cNP_653mZv8L7hc1Q6TN6D9NhahEx5QMjPYs/%3Fsize%3D128/https/cdn.discordapp.com/icons/702883639574396969/0a9741c68d97fd00de8458d20fd9b513.png');
   message.channel.send(faq1);
}
}