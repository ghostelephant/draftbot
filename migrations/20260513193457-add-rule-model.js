'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const {DataTypes} = Sequelize;
    
    await queryInterface.createTable(
      "rules",
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

        draft_id: {
          type: DataTypes.UUID
        },

        created_by: {
          type: DataTypes.UUID
        },

        text: {
          type: DataTypes.TEXT
        }
      },
    );

    await queryInterface.addConstraint("rules", {
      fields: ["draft_id"],
      type: "foreign key",
      name: "rule_draft__fk",
      references: {
        table: "drafts",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    await queryInterface.addConstraint("rules", {
      fields: ["created_by"],
      type: "foreign key",
      name: "rule_creator__fk",
      references: {
        table: "participants",
        field: "id"
      },
      onDelete: "set null",
      onUpdate: "cascade"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("rules");
  }
};
