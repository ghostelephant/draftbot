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
const {Client, Events, GatewayIntentBits} = require("discord.js");
// Create the Discord client -- this is, for all
// practical purposes, "the bot"
const draftbot = new Client({intents: [GatewayIntentBits.Guilds]});

// Log to console when bot is connected
draftbot.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});

// Use token (in .env) to actually log in as bot
draftbot.login(process.env.DISCORD_TOKEN);


/*
// Recognize ping command. Later on I'll build
// // this out a bit more so it recognizes a whole
// // folder's worth of commands dynamically
// const ping = require("./commands/ping");
// draftbot.commands = new Collection();
// draftbot.commands.set("ping", ping);
*/

// Load commands from folder
draftbot.commands = require("./commands");

// Load buttons from folder
draftbot.buttons = require("./buttons");

draftbot.embedColor = 0x13D4D4;

// Handle interactions
draftbot.on(Events.InteractionCreate, i => {
  // Slash command handler
  if(i.isChatInputCommand()){
    // Use the command name from the interaction
    // to determine what code to run
    const command = i.client.commands[i.commandName];
    // Actually run the code
    command.run(i);
  }
  // Button click handler
  if(i.isButton()){
    try{
      const buttonName = i.customId
        .split("-")
        .map((word,  idx) =>
          idx === 0 ?
            word
            :
            `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`
        ).join("");

      const button = i.client.buttons[buttonName];
      button.run(i);
    }
    catch(e){
      console.log(e);
    }
  }

});

// Load models and connect to database
require("./models");