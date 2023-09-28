const Task = require("../models/Task");

const asyncWrapper = require("../middleware/asyncWrapper");

const { createCustomError } = require("../middleware/custom-error");

const getAllTasks = asyncWrapper(async (req, resp) => {
  const tasks = await Task.find({});
  resp.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, resp) => {
  const task = await Task.create(req.body);
  resp.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, resp, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  resp.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, resp) => {
  const { id: taskID } = req.params;

  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  resp.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, resp) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  resp.status(200).json({ task: null });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
