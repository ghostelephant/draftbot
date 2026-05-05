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
    },
    discordUsername: {type: DataTypes.TEXT},
    discordGlobalName: {type: DataTypes.TEXT}
  },

  // Model options
  {
    // Sequelize will infer table names even
    // without this, but I like to be explicit
    tableName: "participants"
  }
);

Draft.belongsToMany(Participant, {
  through: Lineup,
  as: {
    singular: "drafter",
    plural: "drafters"
  }
});
Participant.belongsToMany(Draft, {
  through: Lineup,
  as: {
    singular: "drafter",
    plural: "drafters"
  }
});

Draft.belongsTo(Participant, {
  as: "createdBy",
  foreignKey: "created_by"
});
Participant.hasMany(Draft, {
  foreignKey: "created_by"
});

module.exports = Participant;