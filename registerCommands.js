require("dotenv").config();

const {REST, Routes} = require("discord.js");

const ping = require("./commands/ping");

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

rest.put(
  Routes.applicationGuildCommands(
    process.env.DISCORD_CLIENT_ID,
    process.env.DISCORD_TEST_GUILD_ID
  ), {body: [ping.data.toJSON()]}
)
  .then(console.log)
  .catch(console.error);