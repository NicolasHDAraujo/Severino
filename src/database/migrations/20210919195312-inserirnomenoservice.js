module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'services',
    'title',
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
  ),

  down: () => {},
};
