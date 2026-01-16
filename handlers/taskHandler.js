/**
 * Adds a task to a tasklist.
 * @param {object} taskInfo Information about the task to add.
 * @param {string} taskListId The tasklist to add to.
 * @returns {string} The ID of the created task, ideally update the sheet with this ID.
 * @see https://developers.google.com/tasks/reference/rest/v1/tasks/insert
 *
 * @details
 * Sample taskInfo object:
 * {
 *   title: "{class} - {assignment name}",
 *   notes: "{assignment description}",
 *   due: "2024-12-31T23:59:59.000Z"
 * }
 *
 */
function addTask(taskInfo, taskListId) {
  // Task details with title and notes for inserting new task
  try {
    // Call insert method with taskDetails and taskListId to insert Task to specified tasklist.

    // var task = new Tasks.newTask(task)

    console.warn(taskInfo);
    // let task = {
    //   title: "Pick up dry cleaning",
    //   notes: "Remember to get this done!",
    // };

    info = Tasks.Tasks.insert(taskInfo, taskListId);
    // Print the Task ID of created task.
    console.log('Task with ID "%s" was created.', info.id);
    return info.id;
  } catch (err) {
    // TODO (developer) - Handle exception from Tasks.insert() of Task API
    console.error("Failed with an error %s", err.message);
  }
}

/**
 *
 * @param {*} taskListId
 * @param {*} taskId
 * @returns {object} task
 * @see https://developers.google.com/tasks/reference/rest/v1/tasks/get
 */
function getTask(taskListId, taskId) {
  try {
    // Get the task item of specified tasklist using taskList id and task id.
    const task = Tasks.Tasks.get(taskListId, taskId);
    return task;
  } catch (err) {
    // TODO (developer) - Handle exception from Task API
    console.log("Failed with an error %s", err.message);
  }
}

function updateTask(taskInfo, taskListId, taskId) {
  try {
    // Call update method with taskDetails, taskListId and taskId to update Task to specified tasklist.
    const task = Tasks.Tasks.update(taskInfo, taskListId, taskId);
    // Print the Task ID of updated task.
    console.log('Task with ID "%s" was updated.', task.id);
    return task.id;
  } catch (err) {
    // TODO (developer) - Handle exception from Tasks.update() of Task API
    console.log("Failed with an error %s", err.message);
  }
}

/**
 * Lists task items for a provided tasklist ID.
 * @param  {string} taskListId The tasklist ID.
 * @see https://developers.google.com/tasks/reference/rest/v1/tasks/list
 */
function listTasks(taskListId) {
  try {
    // List the task items of specified tasklist using taskList id.
    const tasks = Tasks.Tasks.list(taskListId);
    // If tasks are available then print all task of given tasklists.
    if (!tasks.items) {
      console.log("No tasks found.");
      return;
    }
    // Print the task title and task id of specified tasklist.
    for (let i = 0; i < tasks.items.length; i++) {
      const task = tasks.items[i];
      console.log('Task with title "%s" and ID "%s" was found.', task.title, task.id);
    }
  } catch (err) {
    // TODO (developer) - Handle exception from Task API
    console.log("Failed with an error %s", err.message);
  }
}
