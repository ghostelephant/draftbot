'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const {DataTypes} = Sequelize;
    await queryInterface.createTable(
      "drafts",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },

        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },

        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },

        name: {
          type: DataTypes.TEXT
        },

        discord_guild_id: {
          type: DataTypes.TEXT
        },

        discord_channel_id: {
          type: DataTypes.TEXT
        },

        status: {
          type: DataTypes.TEXT,
          allowNull: false,
          defaultValue: "setup"
        },

        is_anonymous: {
          type: DataTypes.BOOLEAN
        },

        rounds: {
          type: DataTypes.INTEGER
        },

        current_round: {
          type: DataTypes.INTEGER
        },

        current_pick: {
          type: DataTypes.INTEGER
        },

        can_self_vote: {
          type: DataTypes.BOOLEAN
        },

        vote_count: {
          type: DataTypes.INTEGER
        },
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("drafts");
  }
};