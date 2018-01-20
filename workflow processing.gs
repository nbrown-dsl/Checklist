
//adds new workflow tasks and properties to spreadsheet

function processWorkflow(formArray,workFlowName) {
  
   var docProperties = PropertiesService.getDocumentProperties();
   var workflowObject = docProperties.getProperty(workFlowName);
  //retrieves values of fields entered in form, passed as object with values keyed to form fields names
   var ss = SpreadsheetApp.getActive();
  
  var sheetName = "#workflows";
  
  var sheet = ss.getSheetByName(sheetName);
 
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow+1, 1).setValue(formArray);
  sheet.getRange(lastRow+2, 1).setValue(workflowObject);
  
  
  var response = workFlowName + " created";

  return response;
  
}

