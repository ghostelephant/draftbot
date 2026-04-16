require("dotenv").config();

const {Client, Collection, Events, GatewayIntentBits} = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

const ping = require("./commands/ping");
client.commands = new Collection();
client.commands.set("ping", ping);

// Handle slash commands
client.on(Events.InteractionCreate, i => {
  if(!i.isChatInputCommand()) return;
  console.log(i);
  command = i.client.commands.get(i.commandName);
  command.execute(i);
});