/**
 * File for constants such as headers. Tailor this to your own spreadsheet
 *
 */

/**
 * General constants.
 */
const CONSTANTS = Object.freeze({
  HEADER: {
    // Headers of your spreadsheet. Adjust as needed
    class: 0,
    assnName: 1,
    assnDesc: 2,
    dueDate: 3,
    status: 4,
    taskID: 5,
    lastChanged: 6,
    lastSynced: 7
  },
  RANGES: {
    dataRange: "A2:H",
    taskIDCol: "F2:F",
    rowOffset: 2
  },
  SHEET_NAME: "Misc",
  VALIDATED_HEADERS: ["class", "assnName", "dueDate", "status"]
});

/**
 * Separated Instance of constants for events (attempt at a performance increase)
 *
 * TODO: reintegrate this with normal constants.
 */
const EVENT_CONSTANTS = Object.freeze({
  TARGET_RANGE: {
    sheetName: "Misc",
    startRow: 2,
    startCol: 1, // Column A
    endCol: 7 // Column G
  },
  TIMESTAMP_COLUMN: 7
});
