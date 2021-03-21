module.exports = {
	name: 'aseanHQ',
	description: 'Displays ASEAN hq event photo',
	execute(message, args) {
		message.channel.send('https://buildtheearth.net/uploads/949691e10bf0c009fbe0f6f63f829f08d2e6d483.jpeg');
		console.log('Message Sent');
	},
};


