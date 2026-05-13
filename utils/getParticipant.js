const {Participant} = require("../models");
const getUserNickname = require("../utils/getUserNickname");

const getParticipant = async (user, members) => {
  let participant = await Participant.findOne({
    where: {
      discordId: user.id
    }
  });

  if(!participant){
    const nicknames = await getUserNickname({
      userId: user.id,
      members
    });

    participant = await Participant.create({
      discordId: user.id,
      discordUsername: user.username,
      discordGlobalName: user.globalName,
      discordGuildNicknames: nicknames
    });
  }

  return participant;
};

module.exports = getParticipant;