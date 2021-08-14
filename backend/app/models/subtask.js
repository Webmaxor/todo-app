const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Subtask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Todo.belongsTo(models.Subtask);
    }
  }
  Subtask.init(
    {
      title: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "completed"],
      },
      todoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "todo",
          key: "id",
        },
        field: "todoId",
      },
    },
    {
      sequelize,
      modelName: "Subtask",
    }
  );
  return Subtask;
};
