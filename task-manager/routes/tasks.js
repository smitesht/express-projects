const express = require("express");
const tasksRoute = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

tasksRoute.route("/").get(getAllTasks).post(createTask);

tasksRoute.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = tasksRoute;
