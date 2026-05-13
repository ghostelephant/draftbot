const {SlashCommandBuilder} = require("discord.js");

const {
  listDrafters,
  listPicks
} = require("./subcommands");

const subcommands = {
  drafters: listDrafters,
  picks: listPicks
};

const list = async interaction => {
  const sc = subcommands[interaction.options._subcommand];
  return sc(interaction);
};

const data = new SlashCommandBuilder()
  .setName("list")
  .setDescription("List selected draft data")
  .addSubcommand(sc => 
    sc.setName("drafters")
      .setDescription("List registered drafters")
  )
  .addSubcommand(sc =>
    sc.setName("picks")
      .setDescription("List to-date draft picks")
  );

module.exports = {
  data,
  run: list
}