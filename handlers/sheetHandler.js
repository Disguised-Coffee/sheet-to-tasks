/**
 * Needed:
 * - a way to check what is a valid assignment row
 * - a way to find a row by task ID
 * - a way to backup all tasks to the sheet (to another sheet)
 * - a way to get an assignment row given a task ID
 * - a way to get an assignment object from row data
 *
 */

// static class
class SheetHandler {
  constructor() {}

  /**
   * Gets all rows within sheet
   *
   * @param {*} sheet
   * @param {*} rowNum
   */
  static getRows() {
    var sheet = SpreadsheetApp.getActive().getSheetByName(CONSTANTS.SHEET_NAME);
    var data = sheet.getRange(CONSTANTS.RANGES.dataRange).getValues();
    return data;
  }

  /**
   * @param {*} row
   * @returns {boolean} whether the row is valid for processing
   */
  static validateAssignmentRow(row) {
    // check if row is valid

    for (let i = 0; i < CONSTANTS.VALIDATED_HEADERS.length; i++) {
      let header = CONSTANTS.VALIDATED_HEADERS[i];
      console.log(
        "Validating header:",
        header,
        "at index",
        CONSTANTS.HEADER[header],
        "with value:",
        row[CONSTANTS.HEADER[header]]
      );
      if (String(row[CONSTANTS.HEADER[header]]) === "") {
        return false;
      }
    }
    return true;
  }

  /**
   *
   * @param {*} row
   * @returns {object | null} task-formatted object or null if row data is invalid
   * @see validateAssignmentRow and CONSTANTS.VALIDATED_HEADERS
   */
  static formatRowToTask(row) {
    // check if row is valid
    if (!SheetHandler.validateAssignmentRow(row)) {
      console.log("Invalid assignment row:", row);
      return null;
    }

    return {
      title: row[CONSTANTS.HEADER.class] + " - " + row[CONSTANTS.HEADER.assnName],
      notes: row[CONSTANTS.HEADER.assnDesc],
      due: new Date(row[CONSTANTS.HEADER.dueDate]).toISOString()
    };
  }

  static updateTaskID(rowNum, taskID) {
    console.log(
      "Updating task ID at row",
      rowNum,
      "col",
      CONSTANTS.HEADER.taskID + 1,
      "to",
      taskID
    );
    SheetHandler.getSheet()
      .getRange(rowNum, CONSTANTS.HEADER.taskID + 1)
      .setValue(taskID);
  }

  static getSheet() {
    return SpreadsheetApp.getActive().getSheetByName(CONSTANTS.SHEET_NAME);
  }

  /**
   *
   * @param {*} rowNum
   * @param {*} taskInfo - object returned from Tasks API
   */
  static updateTaskRowInfo(rowNum, taskInfo) {
    let sheet = SheetHandler.getSheet();
    // for now only update note and due date
    if (taskInfo.notes) {
      sheet.getRange(rowNum, CONSTANTS.HEADER.assnDesc + 1).setValue(taskInfo.notes);
    }
    if (taskInfo.due) {
      sheet.getRange(rowNum, CONSTANTS.HEADER.dueDate + 1).setValue(new Date(taskInfo.due));
    }
    if (taskInfo.status) {
      sheet.getRange(rowNum, CONSTANTS.HEADER.status + 1).setValue(taskInfo.status);
    }
  }

  /**
   *
   * @param {Array} taskInfoRow as a list
   */
  static appendTaskRow(taskInfoRow) {
    let sheet = SheetHandler.getSheet();

    sheet.appendRow(taskInfoRow);
  }

  static updateSyncTimestamp(rowNum) {
    SheetHandler.getSheet()
      .getRange(rowNum, CONSTANTS.HEADER.lastSynced + 1)
      .setValue(new Date(Date.now()));
  }

  static backupTasksToSheet() {
    // // get our spreadsheet data
    // var sheet = SpreadsheetApp.getActive().getSheetByName(CONSTANTS.SHEET_NAME);
    // var data = sheet.getRange(CONSTANTS.RANGES.dataRange).getValues();
    // var backupSheet = SpreadsheetApp.getActive().getSheetByName("Backup");
    // if (!backupSheet){
    //     backupSheet = SpreadsheetApp.getActive().insertSheet("Backup");
    // }
  }
}
