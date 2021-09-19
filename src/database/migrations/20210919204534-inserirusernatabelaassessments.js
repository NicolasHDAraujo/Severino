module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'assessments',
    'user_id',
    {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  ),

  down: () => {},
};
