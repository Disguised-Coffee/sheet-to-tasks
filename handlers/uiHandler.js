function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp, SlidesApp or FormApp.
  ui.createMenu("Sheet to Tasks")
    .addItem("Overwrite Tasks", "menuItem1")
    .addItem("Sync Tasks", "menuItem2");
  // .addSeparator()
  // .addSubMenu(ui.createMenu("Sub-menu").addItem("Open side-menu", "menuItem2"))
  // .addToUi();
}

function menuItem1() {
  // Display a dialog box with a title, message, input field, and "Yes" and "No"
  // buttons. The user can also close the dialog by clicking the close button in
  // its title bar.
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    "Overwrite Tasks",
    "Are you sure you want to overwrite all tasks?",
    ui.ButtonSet.YES_NO
  );

  // Process the user's response.
  if (response === ui.Button.YES) {
    console.log("User confirmed overwrite of tasks.");
    enterTasks();
  } else {
    Logger.log(
      "The user either clicked the close button in the dialog's title bar or chose not to overwrite tasks."
    );
  }
}

function menuItem2() {
  console.log("Syncing tasks from Google Tasks...");
  syncTasks();
}

// function menuItem3() {
//   // SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
//   //    .alert('You clicked the second menu item!');
//   // Display a sidebar with custom HtmlService content.
//   const htmlOutput = HtmlService.createHtmlOutput(
//     '<p style="background-color:black; color:white">yk, there\'s always a better way</p>'
//   ).setTitle("This is truly, a test of skill");
//   SpreadsheetApp.getUi().showSidebar(htmlOutput);
// }
