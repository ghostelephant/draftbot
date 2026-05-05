'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const {DataTypes} = Sequelize;

    // Create Participants table
    await queryInterface.createTable(
      "participants",
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

        discord_id: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true
        }
      }
    );

    // Create Lineups through table
    await queryInterface.createTable(
      "lineups",
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

        draft_id: {type: DataTypes.UUID},

        participant_id: {type: DataTypes.UUID},

        order: {type: DataTypes.INTEGER},
        
        is_current: {type: DataTypes.BOOLEAN},

        is_skipped: {type: DataTypes.BOOLEAN},

        ping_time: {type: DataTypes.DATE}
      }
    );

    // Add foreign key constraints
    await queryInterface.addConstraint("lineups", {
      fields: ["draft_id"],
      type: "foreign key",
      name: "lineups_draft_id__fk",
      references: {
        table: "drafts",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    await queryInterface.addConstraint("lineups", {
      fields: ["participant_id"],
      type: "foreign key",
      name: "lineups_participant_id__fk",
      references: {
        table: "participants",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("lineups");
    await queryInterface.dropTable("participants");
  }
};
