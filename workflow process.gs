//returns list of workflow names for sidebar, as array
function listOfWorkFlows() {
  
  var docProperties = PropertiesService.getDocumentProperties();
  var workflownames = docProperties.getKeys();
  
  return workflownames;
  
}


//adds workflow properties to doc properties , as objects keyed to workflow name
function processworkflowForm(form_data) {

  
  var workflowName = form_data.workflow_name;
  var docProperties = PropertiesService.getDocumentProperties();
  
  docProperties.setProperty(workflowName,form_data);
  
  return form_data.workflow_name ;
  
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
