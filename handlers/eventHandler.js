/**
 * Handles edit events on the "Misc" sheet to update timestamps.
 *
 * @param {\GoogleAppsScript.Events.SheetsOnEdit} e
 * @returns {void}
 */
function onEdit(e) {
  const targetSheetName = EVENT_CONSTANTS.TARGET_RANGE.sheetName;
  const targetStartRow = EVENT_CONSTANTS.TARGET_RANGE.startRow;
  const targetStartCol = EVENT_CONSTANTS.TARGET_RANGE.startCol; // Column A
  const targetEndCol = EVENT_CONSTANTS.TARGET_RANGE.endCol; // Column G
  const timestampColumn = EVENT_CONSTANTS.TIMESTAMP_COLUMN;

  const editedSheet = e.range.getSheet();
  if (editedSheet.getName() !== targetSheetName) return;

  const editedRow = e.range.getRow();
  const editedCol = e.range.getColumn();

  console.log(`Edited cell at row: ${editedRow}, column: ${editedCol}`);

  // Check if the edit is within the target range
  if (editedRow < targetStartRow || editedCol < targetStartCol || editedCol > targetEndCol) {
    return;
  }

  // issue: when editting multiple cells, oldValue is undefined
  // workaround: check if the edit was multi-cell by checking number of rows/columns
  const numRows = e.range.getNumRows();
  const numCols = e.range.getNumColumns();
  if (numRows == 1 && numCols == 1) {
    const oldValue = e.oldValue;
    const newValue = e.value;
    console.log(`Old value: ${oldValue}, New value: ${newValue}`);
    if (oldValue === newValue) return;

    // update timestamp for single cell edit
    editedSheet.getRange(editedRow, timestampColumn).setValue(new Date(Date.now()));
    return;
  }

  // Handle multi-row edits (e.g., pasting across multiple rows)
  const startRow = editedRow;
  const timestamp = new Date(Date.now());

  console.log(`Number of rows edited: ${numRows}, starting from row: ${startRow}`);

  // Update timestamps for all affected rows
  for (let i = 0; i < numRows; i++) {
    const currentRow = startRow + i;
    if (currentRow >= targetStartRow) {
      editedSheet.getRange(currentRow, timestampColumn).setValue(timestamp);
    }
  }
}
