const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Todo.hasMany(models.Subtask, { foreignKey: "todoId" });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "completed"],
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
