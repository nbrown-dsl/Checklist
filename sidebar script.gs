// returns app url and workflows data from docrpoerties to be presented in sidebar for copying by user and embedding / linking where they wish and list of workflows
function appUrlandWorkflows() {
  var url = ScriptApp.getService().getUrl();
  
  var docProperties = PropertiesService.getDocumentProperties();
    
  var workFlowData = docProperties.getProperties();
   
  for (var key in workFlowData) {
  Logger.log('Key: %s, Value: %s', key, workFlowData[key]);
  }
  
  return url;
  
}

//present dialogue for creating or editing workflow forms

function showWorkflowForm(workflow_Name) {
  
  // gets array of sheets with tasks listed to be used to select with workflow form
  var sheets = SpreadsheetApp.getActive().getSheets();
  var sheetNames = sheets.map(function(e) { var name = e.getName(); if (name.indexOf('#tasks') > -1) { return name} });
  var taskSheets = sheetNames.filter(function(e) { return e != undefined });
  
  var html = HtmlService.createTemplateFromFile('workFlowDialogueForm');
  
  html.data = taskSheets;
  html.values = workflow_Name;
  html = html.evaluate();
  html.setWidth(800);
  html.setHeight(500);
  
  
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'Workflow form');
}
