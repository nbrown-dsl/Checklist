//adds '*' to student sheet name to add to archive

function archiveStudent(student) {
  
  var userProperties = PropertiesService.getUserProperties();
  var ssId = userProperties.getProperty('ssId');
  
  var ss = SpreadsheetApp.openById(ssId);
  var Sheet = ss.getSheetByName(student);
      Sheet.setName('* '+student)
      
      return;
  
}
