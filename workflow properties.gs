//returns list of workflow names for sidebar, as array
function listOfWorkFlows() {
  
  var docProperties = PropertiesService.getDocumentProperties();
  var workflownames = docProperties.getKeys();
  
  return workflownames;
  
}


//adds workflow properties to doc properties , as objects keyed to workflow name
function processworkflowForm(form_data) {
  
  var repsonse = "";
  var wfSheet;
  var docProperties = PropertiesService.getDocumentProperties();

  var workflowName = form_data["\""+"workflow_name"+"\""].replace(/"/g,"");
  
  var workflowObject = docProperties.getProperty(workflowName);
  
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  
  //if new workflow type then creates new sheet
  if (!workflowObject) {
     
      wfSheet = ss.insertSheet();
      wfSheet.setName('#WF_'+workflowName);
  
  var sheetId = wfSheet.getSheetId();
      
  form_data["\""+"sheetId"+"\""] = '"'+sheetId+'"';  
  response = workflowName + " created";
    
  }
  
  else { 
    
   wfSheet = ss.getSheetByName('#WF_'+workflowName);
    
    response = workflowName + " updated"; }
  
  var formObject = JSON.parse(JSON.stringify(form_data));
  ss.setActiveSheet(wfSheet);
  ss.setActiveRange(wfSheet.getRange(1, 1));
  
    for (var key in formObject) { 
      
      wfSheet.getActiveCell().setValue(formObject[key]);
      wfSheet.setActiveSelection(wfSheet.getActiveRange().offset(0, 1));
    
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
