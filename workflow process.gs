//returns list of workflow names for sidebar, as array
function listOfWorkFlows() {
  
  var docProperties = PropertiesService.getDocumentProperties();
  var workflownames = docProperties.getKeys();
  
  return workflownames;
  
}


//adds workflow properties to doc properties , as objects keyed to workflow name
function processworkflowForm(form_data) {
  
  var workflowName = form_data.workflow_name;
  
  var formObject = JSON.parse(JSON.stringify(form_data));
  
  var docProperties = PropertiesService.getDocumentProperties();
  
  docProperties.setProperty(workflowName,form_data);
   
  return workflowName;
  
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
