const {SlashCommandBuilder, MessageFlags} = require("discord.js");

// Set data needed for slash command registration
const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Test if the bot is online");

// The actual code to run
const execute = async interaction => {
  await interaction.reply({
    content: ":ping_pong: Pong!",
    flags: MessageFlags.Ephemeral
  });
};

// Export data and execute code so bot.js can use it
module.exports = {
  data,
  execute
};