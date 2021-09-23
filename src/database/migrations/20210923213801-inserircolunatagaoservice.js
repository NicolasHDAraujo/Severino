module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'services',
    'tag',
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
  ),

  down: () => {},
};
