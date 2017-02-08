//adds '*' to student sheet name to add to archive

function archiveStudent(student) {
  
  var ss = SpreadsheetApp.openById('1Tvs5BqsSlfyOBfSvfQPlGiSmkW3DoeoBtshvUV86wF4');
  var Sheet = ss.getSheetByName(student);
      Sheet.setName('* '+student)
      
      return;
  
}
