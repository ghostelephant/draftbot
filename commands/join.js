const {SlashCommandBuilder, MessageFlags} = require("discord.js");
const {
  Draft,
  Participant
} = require("../models");
const { Op } = require("sequelize");

const join = async interaction => {
  await interaction.deferReply({
    flags: [MessageFlags.Ephemeral]
  });

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

  let participant = await Participant.findOne({
    where: {
      discordId: interaction.user.id
    }
  });

  if(!participant){
    participant = await Participant.create({
      discordId: interaction.user.id
    });
  }

  if(await draft.hasParticipant(participant)){
    return interaction.followUp(
      `:warning: You have already joined draft "**${draft.name}**"!`
    );
  }

  await draft.addParticipant(participant);

  const participantCount = await draft.countParticipants();

  await interaction.followUp({
    content: `:white_check_mark: You have successfully joined the draft "${draft.name}! This draft currently has ${participantCount} ${participantCount === 1 ? "participant" : "participants"}.`,
    flags: [MessageFlags.Ephemeral]
  });
};

const data = new SlashCommandBuilder()
  .setName("join")
  .setDescription("Join an existing draft");

module.exports = {
  data,
  run: join
}