
const Discord = require("discord.js");


const client = new Discord.Client();


const config = require("./config.json");


client.on("ready", () => {
  
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


client.on("message", async message => {
  
  
  
  if(message.author.bot) return;
  
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    
    const sayMessage = args.join(" ");
 
    message.delete().catch(O_o=>{}); 
  
    message.channel.send(sayMessage);
  }
  
  if(command === "purge") {
    
    
    
    const deleteCount = parseInt(args[0], 10);
    
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  
  if(command === "cheeki") {
	const sayMessage = "Cheeki breeki iv damke!";
	message.delete().catch(O_o=>{});
	message.channel.send(sayMessage);
  }
  if(command === "help") {
	const sayMessage = 'Oi, you cyka! This is your help message!\n\You can use a lot of useful commands blyat.\n\Remember to use the prefix before you type anything you capitalist pig.\n\ >cheeki - So you can greet me properly\n\ >purge - So you can clear this shithole. Can delete from 2 to 1000 messages\n\ >say - So I can talk with you, blyat\n\ >ping - Whatever cyka, it is useless'
	message.delete().catch(O_o=>{});
	message.channel.send(sayMessage);
  }
});

client.login(process.env.BOT_TOKEN);
