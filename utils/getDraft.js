const {Op} = require("sequelize");
const {Draft} = require("../models");

const getDraft = async ({
  discordGuildId,
  discordChannelId,
  excludeStatus
}) => {
  const where = {
    discordGuildId,
    discordChannelId
  };
  if(excludeStatus){
    where.status = {
      [Op.notIn]: (Array.isArray(excludeStatus) ?
        excludeStatus
        :
        [excludeStatus]
      )
    };
  }

  return await Draft.findOne({where});
};

module.exports = getDraft;