/*
  Basic registration script, which needs to be run
  any time a new command is added or substantially
  edited. I pretty much just copied this from
  https://discordjs.guide/legacy/app-creation/deploying-commands
  simplifying it significantly to only register the
  ping command, for now
*/

require("dotenv").config();

const {REST, Routes, SlashCommandBuilder} = require("discord.js");

const ping = require("./commands/ping");

const rest = new REST().setToken(process.env.DISCORD_TOKEN);


const commands = require("./commands");
const commandData = Object.values(commands).map(c => c.data.toJSON());

rest.put(
  Routes.applicationGuildCommands(
    process.env.DISCORD_CLIENT_ID,
    process.env.DISCORD_TEST_GUILD_ID
  ), {body: commandData}
)
  .then(console.log)
  .catch(console.error);