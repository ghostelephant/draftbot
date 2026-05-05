const {DataTypes} = require("sequelize");
const sequelize = require("../config/sequelize");
const Draft = require("./draft.model");

const Lineup = sequelize.define(
  // Model name
  "lineup",

  // Model attributes
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    draftId: {
      type: DataTypes.UUID,
      references: {
        model: Draft,
        key: 'id'
      },
    },
    participantId: {
      type: DataTypes.UUID,
      references: {
        model: "participants",
        key: "id"
      }
    },
    order: {type: DataTypes.INTEGER},
    isCurrent: {type: DataTypes.BOOLEAN},
    isSkipped: {type: DataTypes.BOOLEAN},
    pingTime: {type: DataTypes.DATE}
  },

  // Model options
  {
    // Sequelize will infer table names even
    // without this, but I like to be explicit
    tableName: "lineups"
  }
);

module.exports = Lineup;