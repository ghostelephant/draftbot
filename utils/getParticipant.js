const {Participant} = require("../models");

const getParticipant = async user => {
  // console.log(user);

  let participant = await Participant.findOne({
    where: {
      discordId: user.id
    }
  });

  if(!participant){
    participant = await Participant.create({
      discordId: user.id,
      discordUsername: user.username,
      discordGlobalName: user.globalName
    });
  }

  return participant;
};

module.exports = getParticipant;