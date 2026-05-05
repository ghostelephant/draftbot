const {SlashCommandBuilder} = require("discord.js");

const {refreshUser} = require("./subcommands");

const subcommands = {
  user: refreshUser
};

const refresh = async interaction => {
  const sc = subcommands[interaction.options._subcommand];
  return sc(interaction);
};

const data = new SlashCommandBuilder()
  .setName("refresh")
  .setDescription("Refresh specified item")
  .addSubcommand(sc =>
    sc.setName("user")
    .setDescription("Refresh user data")
    .addUserOption(option => option
      .setName("user")
      .setDescription("The user to refresh")
    )
  );

module.exports = {
  data,
  run: refresh
};