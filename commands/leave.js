const {SlashCommandBuilder, MessageFlags} = require("discord.js");
const {Draft} = require("../models");
const {getParticipant} = require("../utils");
const {Op} = require("sequelize");

const leave = async interaction => {
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

  let participant = await getParticipant(interaction.user);

  if(!(await draft.hasDrafter(participant))){
    return interaction.followUp(
      `:warning: You are not in draft "**${draft.name}**"!`
    );
  }

  await draft.removeDrafter(participant);

  await interaction.followUp({
    content: `:white_check_mark: You have successfully left the draft "${draft.name}."`,
    flags: [MessageFlags.Ephemeral]
  });
};

const data = new SlashCommandBuilder()
  .setName("leave")
  .setDescription("Leave a draft you had previously joined");

module.exports = {
  data,
  run: leave
}