
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

//returns object[][] of workflow sheet list of all tasks
function allTasks() {
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('#workflows');
  var  allTasks = sheet.getDataRange().getValues();  //returns object[][] of task values
    
  return allTasks; 
  
}

//sets spreadsheet values as submitted from workflow tasks dialogue

function tasksToSpreadsheet(tasks,usernames,responsibility,workflowName) {
  
   var ss = SpreadsheetApp.getActive();
   var sheet = ss.getSheetByName("#workflows");
   var rowNumber = tasks.length;
  
   var newData = [];
  
  for (var r=0; r<rowNumber; r++) {
  
    newData[r]= new Array(3);
   
    newData[r][0] = tasks[r];
    newData[r][2] = usernames[r];
    newData[r][1] = responsibility[r];
    
  }
  
  var data = sheet.getDataRange().getValues();
  
  var row = 0;
  while (data[row][0].indexOf(workflowName)<0 && row<data.length) { row++ };
  
  var range = sheet.getRange(row+1,2,rowNumber,3);
      range.setValues(newData);
  
  return workflowName+" updated";
    
}



