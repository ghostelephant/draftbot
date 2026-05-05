'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const {DataTypes} = Sequelize;

    await queryInterface.addColumn(
      "drafts",
      "created_by",
      {type: DataTypes.UUID}
    );

    await queryInterface.addColumn(
      "participants",
      "discord_username",
      {type: DataTypes.TEXT}
    );

    await queryInterface.addColumn(
      "participants",
      "discord_global_name",
      {type: DataTypes.TEXT}
    );

    await queryInterface.addConstraint("drafts", {
      fields: ["created_by"],
      type: "foreign key",
      name: "draft_creator__fk",
      references: {
        table: "participants",
        field: "id"
      },
      onDelete: "set null",
      onUpdate: "cascade"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "participants",
      "discord_username"
    );

    await queryInterface.removeColumn(
      "participants",
      "discord_global_name"
    );

    await queryInterface.removeColumn(
      "drafts",
      "created_by"
    );
  }
};
