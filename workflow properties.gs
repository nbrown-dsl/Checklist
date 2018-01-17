//returns list of workflow names for sidebar, as array
function listOfWorkFlows() {
  
  var docProperties = PropertiesService.getDocumentProperties();
  var workflownames = docProperties.getKeys();
  
  return workflownames;
  
}


//adds workflow properties to doc properties , as objects keyed to workflow name, and creates/ammends sheet for workflow type 
function processworkflowForm(form_data) {
  
  var repsonse = "";
  var wfSheet;
  var docProperties = PropertiesService.getDocumentProperties();

  var workflowName = form_data["\""+"workflow_name"+"\""].replace(/"/g,"");
  
  var workflowObject = docProperties.getProperty(workflowName);
  
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  
  
  //if new workflow type then creates new sheet
  if (!workflowObject) {
    
  var ssTemplate = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1-6m6HQjhMVDW7ZdYALhLxYJA3WUxKxIZc8ZS5ZCOpeI/edit#gid=0") 
   
  wfSheet = ssTemplate.getSheetByName("#workflow_template").copyTo(ss);   
  wfSheet.setName('#WF_'+workflowName);
  SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(wfSheet);
  SpreadsheetApp.getActiveSpreadsheet().moveActiveSheet(2);
  
  var sheetId = wfSheet.getSheetId();
      
  form_data["\""+"sheetId"+"\""] = '"'+sheetId+'"';  
  response = workflowName + " created";
    
  }
  
  else { 
    
   wfSheet = ss.getSheetByName('#WF_'+workflowName);
    
    response = workflowName + " updated"; }
  
  //setting form fields of workflow type in each task row
  var formObject = JSON.parse(JSON.stringify(form_data));
  ss.setActiveSheet(wfSheet);
  
  var formInfoHeaders = ss.setActiveRange(wfSheet.getRange(1,1));
  
  for (var key in formObject) { 
      
      formObject[key] = formObject[key].replace(/"/g,"");
      
    if ( key.indexOf("entryOption")<0 && formObject[key].length >1 ) {
      if ( key.indexOf("workflow_name")>0 ) {
        wfSheet.getRange("B2:B2").setValue([formObject[key]]);
      }
      if ( key.indexOf("sheetId")>0 ) {
        wfSheet.getRange("A2:A2").setValue([formObject[key]]);
      }
      if ( key.indexOf("tasks_sheetName")>0 ) {
        wfSheet.getRange("C2:C2").setValue([formObject[key]]);
      }
 
    }
    }
 
  docProperties.setProperty(workflowName,form_data);
    
  return response;
  
}

//gets workflow properties from doc properties for presenting as form in dialogue
function getworkflowForm(workflowName) {
 
 
  var docProperties = PropertiesService.getDocumentProperties();
   
  var workflowForm = docProperties.getProperty(workflowName.trim());
  
  
  return workflowForm;
  
}


function WorkflowList() {
  
  var docProperties = PropertiesService.getDocumentProperties();
  
  var data = docProperties.getProperties();
  
  var stringData = JSON.parse(JSON.stringify(data));
  
  Logger.log(stringData);
  
  return(stringData);
}


//remove all properties

function eraseProperties() {
  
  var docProperties = PropertiesService.getDocumentProperties();
  
  docProperties.deleteAllProperties();
  
}

//remove workflow

function deleteWorkFlow(workflowName) {
  
   var docProperties = PropertiesService.getDocumentProperties();
  
  docProperties.deleteProperty(workflowName.toString().trim());
  
  var response = workflowName + "deleted"
  
  return response;
  
  
}
