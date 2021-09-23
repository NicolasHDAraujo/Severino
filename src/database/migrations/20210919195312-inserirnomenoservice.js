module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'services',
    'titulo',
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
  ),

  down: () => {},
};
