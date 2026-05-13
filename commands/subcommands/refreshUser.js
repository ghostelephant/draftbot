const {MessageFlags} = require("discord.js");
const {getParticipant, getUserNickname} = require("../../utils");

const refreshUser = async interaction => {
  await interaction.deferReply({
    flags: [MessageFlags.Ephemeral]
  });

  try{
    // Get user info from Discord
    const user = interaction.options.getUser("user") || interaction.user;

    // Get participant info from database
    const participant = await getParticipant(user);

    // Add participant's server nickname to
    // hashmap (via helper function)
    const nicknames = await getUserNickname({
      userId: user.id,
      members: interaction.guild.members,
      nicknames: participant.discordServerNicknames
    });

    await participant.update({
      discordUsername: user.username,
      discordGlobalName: user.globalName,
      discordGuildNicknames: nicknames
    });

    interaction.followUp({
      content: `User ${user.username} successfully updated.`,
      flags: [MessageFlags.Ephemeral]
    });
  }
  catch(e){
    console.log(e);
    interaction.followUp({
      content: "Something went wrong.",
      flags: [MessageFlags.Ephemeral]
    })
  }
};

module.exports = refreshUser;