/**
 * Enters data from sheet into Google Tasks.
 */
function enterTasks() {
  console.log("Entering tasks...");
  rows = SheetHandler.getRows();
  console.log(TASK_LIST);

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let task = SheetHandler.formatRowToTask(row);
    if (task != null) {
      console.log("Adding task:", task);
      // check if the task already has an ID
      // we can do this by first checking the taskID column
      // and then checking if the task exists in Google Tasks
      let taskID = row[CONSTANTS.HEADER.taskID];
      console.log("Existing task ID:", taskID);
      if (String(taskID) !== "") {
        console.error("Task ID exists in sheet:", taskID);
        // check if task exists
        let existingTask = null;
        try {
          existingTask = getTask(TASK_LIST, taskID);
          if (existingTask != null) {
            console.log("Task with ID", taskID, "already exists. Skipping.");
            continue;
          }
        } catch (e) {
          console.log("Task with ID", taskID, "does not exist. Will create a new task.");
        }
      }
      r = addTask(task, TASK_LIST);

      // after adding the task, update the task ID in the sheet
      SheetHandler.updateTaskID(i + CONSTANTS.RANGES.rowOffset, r);
      SheetHandler.updateSyncTimestamp(i + CONSTANTS.RANGES.rowOffset);
    }
  }
}

/**
 * Syncs tasks from Google Tasks back to the sheet, favoring updates from Google Tasks
 */
function syncTasks() {
  console.log("Syncing tasks...");
  rows = SheetHandler.getRows();

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let taskID = row[CONSTANTS.HEADER.taskID];

    if (String(taskID) !== "") {
      // task exists, fetch it
      let existingTask = null;
      try {
        existingTask = getTask(TASK_LIST, taskID);
        if (existingTask == null) {
          throw new Error("Task with ID " + taskID + " not found.");
        }
        // check last updated time from task vs last synced time in sheet
        let taskUpdatedTime = new Date(existingTask.updated).getTime();
        let sheetUpdatedTime = new Date(row[CONSTANTS.HEADER.lastChanged]).getTime();

        if (isNaN(sheetUpdatedTime)) {
          sheetUpdatedTime = 0;
        }

        if (taskUpdatedTime > sheetUpdatedTime) {
          // task is newer, update sheet
          SheetHandler.updateTaskRowInfo(i + CONSTANTS.RANGES.rowOffset, existingTask);
          SheetHandler.updateSyncTimestamp(i + CONSTANTS.RANGES.rowOffset);
          console.log("Updated task ID:", updatedTaskID);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
}

/**
 * Prunes tasks in Google Tasks that are no longer in the sheet.
 */
function pruneTasks() {
  console.log("Pruning tasks...");
  // Get a copy of the taskList from Google Tasks

  // Go through sheet and remove tasks that have taskIDs in the sheet from the taskList

  // Any remaining tasks in the taskList are to be deleted from Google Tasks
}
