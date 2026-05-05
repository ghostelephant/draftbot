const {SlashCommandBuilder} = require("discord.js");
const {Draft} = require("../models");
const {Op} = require("sequelize");
const getParticipant = require("../utils/getParticipant");

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

  const existingDraft = await Draft.findOne({
    where: {
       discordGuildId: draftData.discordGuildId,
       discordChannelId: draftData.discordChannelId,
       status: {
        [Op.notIn]: ["completed", "abandoned"]
       }
    }
  });

  if(existingDraft){
    return interaction.followUp(`:no_entry_sign: New draft was not created!\nA draft, "**${existingDraft.name}**," is already running in this channel.`)
  }

  const draft = await Draft.create(draftData);

  const participant = await getParticipant(interaction.user);
  draft.setCreatedBy(participant);

  await interaction.followUp(`:white_check_mark: Your draft "**${draft.name}**" has been created!`);
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