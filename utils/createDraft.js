const {Draft} = require("../models");

const createDraft = async draftData => {
  const draft = await Draft.create(draftData);

  return draft;
};

module.exports = createDraft;