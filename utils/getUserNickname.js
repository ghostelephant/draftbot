const getUserNickname = async ({
  userId,
  members,
  nicknames
}) => {
  if(!nicknames) nicknames = {};

  const member = await members.fetch(userId);
  nicknames[members.guild.id] = member.nickname;
  return nicknames;
};

module.exports = getUserNickname;