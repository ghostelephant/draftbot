/*
  This is the home file of the bot -- running this
  file is how you start/run the bot, so everything
  starts here. Any other file needed will be called
  (either directly or indirectly) from within this
  file.
*/

// Expose environment variables in .env file, where
// private data like the bot token is stored
require("dotenv").config();

// Import necessary definitions from Discord
const {Client, Collection, Events, GatewayIntentBits} = require("discord.js");
// Create the Discord client -- this is, for all
// practical purposes, "the bot"
const draftbot = new Client({intents: [GatewayIntentBits.Guilds]});

// Send a message when bot is connected
draftbot.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});

// Use token (in .env) to actually log in as bot
draftbot.login(process.env.DISCORD_TOKEN);

// Recognize ping command. Later on I'll build
// this out a bit more so it recognizes a whole
// folder's worth of commands dynamically
const ping = require("./commands/ping");
draftbot.commands = new Collection();
draftbot.commands.set("ping", ping);

// Handle slash commands
draftbot.on(Events.InteractionCreate, i => {
  // Exit if interaction isn't a command
  if(!i.isChatInputCommand()) return;
  // Use the command name from the interaction
  // to determine what code to run
  command = i.client.commands.get(i.commandName);
  // Actually run the code
  command.execute(i);
});

require("./config/sequelize");