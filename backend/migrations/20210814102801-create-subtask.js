module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Subtasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("pending", "completed"),
        defaultValue: "pending",
      },
      todoId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Todos",
          key: "id",
          as: "todoId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Subtasks");
  },
};
