module.exports = {
	name: 'aseanHQ',
	description: 'Displays ASEAN hq event photo',
	execute(message, args) {
        message.channel.send({
            files: ['../photos/ASEANhq2.png']
        });
         
	},
};