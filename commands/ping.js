const {SlashCommandBuilder, MessageFlags} = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Test if the bot is online");

const execute = async interaction => {
  await interaction.reply({
    content: ":ping_pong: Pong!",
    flags: MessageFlags.Ephemeral
  });
};

module.exports = {
  data,
  execute
};