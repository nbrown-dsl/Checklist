function processWorkflow(formArray,workFlowName) {
  
   var docProperties = PropertiesService.getDocumentProperties();
   var workflowObject = docProperties.getProperty(workFlowName);
  //retrieves values of fields entered in form, passed as object with values keyed to form fields names
   var ss = SpreadsheetApp.getActive();
  
  var sheetName = "#WF_"+workFlowName;
  
  var sheet = ss.getSheetByName(sheetName);
  
  sheet.getRange(3, 1).setValue(formArray);
  sheet.getRange(4, 1).setValue(workflowObject);
  
 
  
  
  return formArray[0].value;
  
}