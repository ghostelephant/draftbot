const {getDraft} = require("../../utils");

const listParticipants = async interaction => {
  await interaction.deferReply();

  const draft = await getDraft({
    discordGuildId: interaction.guildId,
    discordChannelId: interaction.channelId,
    excludeStatus: ["completed", "abandoned"]
  });

  if(!draft){
    return interaction.followUp(
      "There does not appear to be a draft currently running in this channel! You can create one with the `/create` command."
    );
  }

  const drafters = await draft.getDrafters();

  const embed = {
    color: interaction.client.embedColor,
    title: `Registered Drafters (${drafters.length})`,
    fields: [
      {
        name: `Draft: "${draft.name}"`,
        value: drafters.length ?
          drafters.map(d => `- <@${d.discordId}>`).join("\n")
          :
          "There are no registered drafters yet."
      }
    ],
    footer: {
      text: "Note: The order listed here does not necessarily reflect draft pick order."
    }
  };

  await interaction.followUp({
    embeds: [embed]
    // `**${draft.name}** (participant count: ${await draft.countDrafters()})\n\n` +
    // (drafters.length ?
    //   drafters
    //     .map(p => `<@${p.discordId}>`)
    //     .join("\n")
    //     + "\n\n-# Note: The order listed here does not necessarily reflect draft pick order."
    //   :
    //   "There are no registered drafters yet."
    // )
  });
}

module.exports = listParticipants;