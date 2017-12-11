// returns app url to be presented in sidebar for copying by user and embedding / linking where they wish
function appUrl() {
  var url = ScriptApp.getService().getUrl();
  
  return url;
  
}

//present dialogue for creating or editing workflow forms

function showWorkflowForm() {
  
  // gets array of sheets with tasks listed to be used to slect with workflow form
  var sheets = SpreadsheetApp.getActive().getSheets();
  var sheetNames = sheets.map(function(e) { var name = e.getName(); if (name.indexOf('#tasks') > -1) { return name} });
  var taskSheets = sheetNames.filter(function(e) { return e != undefined });
  
  
  var html = HtmlService.createTemplateFromFile('workFlowDialogueForm');
  
  html.data = taskSheets;
  html = html.evaluate();
  
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'Workflow form');
}
