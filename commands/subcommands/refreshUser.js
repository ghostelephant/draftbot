const {MessageFlags} = require("discord.js");
const {getParticipant} = require("../../utils");

const refreshUser = async interaction => {
  await interaction.deferReply({
    flags: [MessageFlags.Ephemeral]
  });

  try{
    // Get user info from Discord
    const user = interaction.options.getUser("user") || interaction.user;
    // Get guild membership info from Discord
    // (needed for updating server nickname)
    const member = await interaction.guild.members.fetch(user.id);
    // Get participant info from database
    const participant = await getParticipant(user);

    // Get user's current display name and
    // add to server hashmap
    const nicknames = participant.discordServerNicknames || {};
    nicknames[interaction.guildId] = member.nickname || user.displayName;

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