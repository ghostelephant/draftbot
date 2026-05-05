const {DataTypes} = require("sequelize");
const sequelize = require("../config/sequelize");

const Draft = sequelize.define(
  // Model name
  "draft",

  // Model attributes
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {type: DataTypes.TEXT},
    discordGuildId: {type: DataTypes.TEXT},
    discordChannelId: {type: DataTypes.TEXT},
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "setup"
    },
    isAnonymous: {type: DataTypes.BOOLEAN},
    rounds: {type: DataTypes.INTEGER},
    currentRound: {type: DataTypes.INTEGER},
    currentPick: {type: DataTypes.INTEGER},
    canSelfVote: {type: DataTypes.BOOLEAN},
    voteCount: {type: DataTypes.INTEGER}
  },

  // Model options
  {
    // Sequelize will infer table names even
    // without this, but I like to be explicit
    tableName: "drafts"
  }
);

module.exports = Draft;