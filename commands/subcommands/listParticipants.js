const {Draft} = require("../../models");
const {Op} = require("sequelize")

const listParticipants = async interaction => {
  await interaction.deferReply();

  const draft = await Draft.findOne({
    where: {
      discordGuildId: interaction.guildId,
      discordChannelId: interaction.channelId,
      status: {
        [Op.notIn]: ["completed", "abandoned"]
      }
    }
  });

  if(!draft){
    return interaction.followUp(
      "There does not appear to be a draft currently running in this channel! You can create one with the `/create` command."
    );
  }

  const participants = await draft.getParticipants();

  interaction.followUp(
    `**${draft.name}** (participant count: ${await draft.countParticipants()})\n\n` +
    (participants.length ?
      participants
        .map(p => `<@${p.discordId}>`)
        .join("\n")
        + "\n\n-# Note: The order listed here does not necessarily reflect draft pick order."
      :
      "There are no registered participants yet."
    )
  );
}

module.exports = listParticipants;