const {
  getDraft,
  getParticipant
} = require("../../utils");
const {Rule} = require("../../models");

const addRule = async interaction => {
  await interaction.deferReply();

  const draft = await getDraft({
    discordGuildId: interaction.guildId,
    discordChannelId: interaction.channelId,
    excludeStatus: ["completed", "abandoned"]
  });

  if(!draft){
    return interaction.followUp(":no_entry_sign: No running draft found in this channel; cannot add a rule.");
  }

  const rule = await Rule.create({
    text: interaction.options.getString("text")
  });

  const participant = await getParticipant(
    interaction.user,
    interaction.guild.members
  );
  rule.setDraft(draft);
  rule.setCreatedBy(participant)

  interaction.followUp(
    `:white_check_mark: New rule added:\n${rule.text}`
  );
};

module.exports = addRule;