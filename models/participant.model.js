const {DataTypes} = require("sequelize");
const sequelize = require("../config/sequelize");
const Draft = require("./draft.model");
const Lineup = require("./lineup.model");

const Participant = sequelize.define(
  // Model name
  "participant",

  // Model attributes
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    discordId: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  },

  // Model options
  {
    // Sequelize will infer table names even
    // without this, but I like to be explicit
    tableName: "participants"
  }
);

Draft.belongsToMany(Participant, {through: Lineup});
Participant.belongsToMany(Draft, {through: Lineup});

module.exports = Participant;