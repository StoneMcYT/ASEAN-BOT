//index.js - Main file of StoneMcNetwork discord bot
//Made by CookieGMVN, StoneMc
//version 0.2
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const moment = require('moment');
const Canvas = require('canvas');
const cron = require('cron');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var ip2 = 'asean.my.to';

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log(client.user.username + ' has started');
  const date = moment().format('lll');
  client.user.setActivity('Started at ' + date, {
  type: "PLAYING",
  });
});
//dm code test
//Status
function status(callback, ip) {
	var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://mcapi.us/server/status?ip='+ip2, true);
      ourRequest.onload = () => {
		var ourData = JSON.parse(ourRequest.responseText);
		callback(null, checkStatus(ourData));
    };
	ourRequest.onerror = function() {
  		console.error(ourRequest.statusText);
	};
    ourRequest.send();
}

function checkStatus(data){
	if(data.online){
		if (data.players.max === 0){
			return "The server is offline.";
		}
		else {
			return "The MC server is online, players currently online: " + data.players.now + " /" + data.players.max + " IP - asean.my.to";
		}

	} else {
		return "server offline";
	}
}


client.on('ready', () => {
	console.log('The bot in online');
});

client.on('message', message => {
	var args = message.content.split(/[ ]+/);
	if(message.content === '/hello'){
		message.reply('Hello there');
	}
	if(message.content === '/status'){
			status((error, result) => {
				if (error) {
					message.channel.send("error!");
					return;
				}
			message.channel.send(result);
		}, ip2);
	}
});

//canvas
client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'stonetests');
	if (!channel) return;
  
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');
  
	const background = await Canvas.loadImage('./photos/wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the StoneMcNetwork,', canvas.width / 2.5, canvas.height / 3.5);
  
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
  
	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
  
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);
  
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  
	channel.send(`Welcome to ASEAN BTE, ${member}!`, attachment);
  }); 
  
  //event listener
  client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
  
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	  if (command === 'send'){
		if (!message.member.roles.cache.some(role => role.name === 'Staff')) return;
	
  
			  function getUserFromMention(mention) {
	  if (!mention) return;
	  if (mention.startsWith('<@') && mention.endsWith('>')) {
		  mention = mention.slice(2, -1);
		  if (mention.startsWith('!')) {
			  mention = mention.slice(1);
		  }
		  return mention;
	  }
  }
  const user = getUserFromMention(args[0])
  let MessageDM = args[1]
  client.users.cache.get(user).send(MessageDM);
	  }
  
  //cron jobs, send message hourly
	var CronJob = cron.CronJob;
  new CronJob('0 0 */1 * * *', function() {
			try {
			  const channel = client.channels.cache.get('820303612269953026');
			  channel.bulkDelete(1)
			  const date = moment().format('LLL'); 
				const Embed = new Discord.MessageEmbed()
	  .setColor('#00FFF')
	  .setTitle('ASEAN BTE')
	  .setImage("https://cdn.vox-cdn.com/thumbor/3Y-cQ6fNNy_gmXC7G9aeTQZZ_8g=/0x0:767x431/920x613/filters:focal(323x155:445x277):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63226878/0fe20042_0bb8_4781_82f4_7130f928b021.0.jpg")
	  .addFields(
		{ name: 'Total member:', value: `${message.guild.memberCount} `},
		{ name: 'Server name:', value: `${message.guild.name}` },
		{ name: 'Now time', value: date},
		)
	  .setFooter('Updated hourly, now time is '+ date)
  channel.send(Embed)
			} catch (e) {
				console.log(e);
			}
		}, function() {},
		true
	);
  
	if (message.content === `${prefix}join`) {
	  client.emit('guildMemberAdd', message.member);
	}
	if (!client.commands.has(command)) return;
  
	try {
	  client.commands.get(command).execute(message, args);
	} catch (error) {
	  console.error(error);
	  message.reply('There was an error trying to execute that command!');
	}
  }); 
//simple hi auto resonder

client.on('message', message => {

if (message.content === 'Hi') {
	message.channel.send('Hi :)');
}
});
client.on('message', message => {
	if (message.content === 'hi') {
		message.channel.send('Hi :)');
	}
	});
client.on('message', message => {
		if (message.content === prefix + 'aseanHQ') {
			message.channel.send({
				files: ['photos/ASEANhq2.png']
			});
		}});
			

client.login(token) //login to the bot use token from config.json








