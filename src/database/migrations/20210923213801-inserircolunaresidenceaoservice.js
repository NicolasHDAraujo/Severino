module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'services',
    'residencia',
    {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  ),

  down: () => {},
};
