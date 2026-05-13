'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const {DataTypes} = Sequelize;

    await queryInterface.addColumn(
      "participants",
      "discord_guild_nicknames",
      {type: DataTypes.JSONB}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "participants",
      "discord_guild_nicknames"
    );
  }
};
