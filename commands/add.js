const {SlashCommandBuilder} = require("discord.js");
const {addRule} = require("./subcommands");

const subcommands = {
  rule: addRule
};

const add = async interaction => {
  const sc = subcommands[interaction.options._subcommand];
  return sc(interaction);
};

const data = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add selected item")
  .addSubcommand(sc =>
    sc.setName("rule")
      .setDescription("Add a new rule to draft")
      .addStringOption(option => option
        .setName("text")
        .setDescription("The text of the rule")
        .setRequired(true)
      )
  );

module.exports = {
  data,
  run: add
};