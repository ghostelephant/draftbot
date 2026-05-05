const {MessageFlags} = require("discord.js");
const {getParticipant} = require("../../utils");

const refreshUser = async interaction => {
  await interaction.deferReply({
    flags: [MessageFlags.Ephemeral]
  });

  try{
    const user = interaction.options.getUser("user") || interaction.user;

    const participant = await getParticipant(user);

    await participant.update({
      discordUsername: user.username,
      discordGlobalName: user.globalName
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