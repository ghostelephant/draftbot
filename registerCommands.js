/*
  Basic registration script, which needs to be run
  any time a new command is added or substantially
  edited. I pretty much just copied this from
  https://discordjs.guide/legacy/app-creation/deploying-commands
  simplifying it significantly to only register the
  ping command, for now
*/

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