const {Op} = require("sequelize");
const {Draft} = require("../models");

const getDraft = async ({
  discordGuildId,
  discordChannelId,
  excludeStatus,
  eager
}) => {
  const options = {
    where: {
      discordGuildId,
      discordChannelId
    }
  };
  if(excludeStatus){
    options.where.status = {
      [Op.notIn]: (Array.isArray(excludeStatus) ?
        excludeStatus
        :
        [excludeStatus]
      )
    };
  }

  if(eager){
    options.include = eager;
  }


  return await Draft.findOne(options);
};

module.exports = getDraft;