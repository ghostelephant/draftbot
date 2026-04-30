const {MessageFlags, SlashCommandBuilder} = require("discord.js");

// The actual code to run
const ping = async interaction => {
  await interaction.reply({
    content: ":ping_pong: Pong!",
    flags: MessageFlags.Ephemeral
  });
};

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Test if the bot is online");

// Export function and description
module.exports = {
  data,
  run: ping
};