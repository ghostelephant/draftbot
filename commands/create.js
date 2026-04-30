const {MessageFlags, SlashCommandBuilder} = require("discord.js");
const {createDraft} = require("../utils");

// The actual code to run
const create = async interaction => {
  await interaction.deferReply();

  const draftData = {
    name: interaction.options.getString("name"),
    discordGuildId: interaction.guildId,
    discordChannelId: interaction.channelId,
    isAnonymous: !!interaction.options.getBoolean("anonymous"),
    status: "setup"
  };

  const draft = await createDraft(draftData);
  console.log(draft);

  await interaction.followUp(`Your draft "${draft.name}" has been created!`);
};

const data = new SlashCommandBuilder()
  .setName("create")
  .setDescription("Create a new draft")
  .addStringOption(option => option
    .setName("name")
    .setDescription("The name of the draft")
    .setRequired(true)
  )
  .addBooleanOption(option => option
    .setName("anonymous")
    .setDescription("Hide the identity of drafters")
  );


module.exports = {
  data,
  run: create
};