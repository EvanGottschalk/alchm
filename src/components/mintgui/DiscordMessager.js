export default { sendMessage }

const Discord = require('discord.js');
const client = new Discord.Client();

function sendMessage(userHandle, message) {
    client.on('ready', () => {
      const user = client.users.cache.find(user => user.tag === userHandle);
      if (user) {
        user.send(message)
          .then(() => console.log(`Message sent to ${userHandle}: ${message}`))
          .catch(error => console.error(`Error sending message to ${userHandle}: ${error}`));
      } else {
        console.error(`User ${userHandle} not found.`);
      }
    });
  
    client.login('YOUR_DISCORD_BOT_TOKEN_HERE');
  }