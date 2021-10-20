module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'addresses',
    'service_id',
    {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'services',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  ),

  down: () => {},
};
