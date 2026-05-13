const {DataTypes, ForeignKeyConstraintError} = require("sequelize");
const sequelize = require("../config/sequelize");
const Draft = require("./draft.model");
const Participant = require("./participant.model");

const Rule = sequelize.define(
  // Model name
  "rule",

  // Model attributes
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    text: {type: DataTypes.TEXT}
  },

  // Model options
  {
    tableName: "rules"
  }
);

Rule.belongsTo(Participant, {
  as: "createdBy",
  foreignKey: "created_by"
});
Participant.hasMany(Rule, {
  foreignKey: "created_by"
});

Rule.belongsTo(Draft, {
  foreignKey: "draft_id"
});
Draft.hasMany(Rule, {
  foreignKey: "draft_id"
});

module.exports = Rule;