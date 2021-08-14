module.exports = {
  up: async (queryInterface) => {
    const allTasks = await queryInterface.bulkInsert(
      "Todos",
      [
        {
          title: "Wedding plan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Attire",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Guests",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Venue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Catering",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const attireId = allTasks.find((task) => task.title === "Attire").id;
    const guestsId = allTasks.find((task) => task.title === "Guests").id;
    const venueId = allTasks.find((task) => task.title === "Venue").id;
    const cateringId = allTasks.find((task) => task.title === "Catering").id;

    await queryInterface.bulkInsert(
      "Subtasks",
      [
        {
          title: "Bridal Party Fitting",
          todoId: attireId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Order Bridesmaids Dress",
          todoId: attireId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Order Wedding Dress",
          todoId: attireId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Subtasks",
      [
        {
          title: "Guest List",
          todoId: guestsId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Finalize Guest List",
          todoId: guestsId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Subtasks",
      [
        {
          title: "Research Venues",
          todoId: venueId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Book Venue",
          todoId: venueId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Subtasks",
      [
        {
          title: "Research Caterer",
          todoId: cateringId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Food Tasting",
          todoId: cateringId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Book Caterer",
          todoId: cateringId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Todos", null, {});
    await queryInterface.bulkDelete("Subtasks", null, {});
  },
};
