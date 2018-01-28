
//adds new workflow tasks and properties to workflow sheet

function processWorkflow(formArray) {
  
  //retrieves values of fields entered in form, passed as object with values keyed to form fields names
   var ss = SpreadsheetApp.getActive();
    
  var formObject = JSON.parse(JSON.stringify(formArray));
  
  var taskSheetName = formObject['"tasks_sheetName"'].replace(/"/g,"");
  var taskSheet = ss.getSheetByName(taskSheetName);
  
  var lastTaskRow = taskSheet.getLastRow();
  var tasksData = taskSheet.getSheetValues(2, 1,lastTaskRow-1, 2);
  
  var sheet = ss.getSheetByName("#workflows");
  sheet.insertRowsAfter(1, lastTaskRow-1)
 
  var lastRow = sheet.getLastRow();
  sheet.getRange(2, 1,lastTaskRow-1, 1).setValue(formArray);
  sheet.getRange(2, 2,lastTaskRow-1, 2).setValues(tasksData);
  
  var response = "Workflow created";

  return response;
  
}

