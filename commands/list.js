const {SlashCommandBuilder} = require("discord.js");

const {
  listParticipants,
  listPicks
} = require("./subcommands");

const subcommands = {
  participants: listParticipants,
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
    sc.setName("participants")
      .setDescription("List participants in a draft")
  )
  .addSubcommand(sc =>
    sc.setName("picks")
      .setDescription("List to-date draft picks")
  );

module.exports = {
  data,
  run: list
}