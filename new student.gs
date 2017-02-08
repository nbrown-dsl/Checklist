

function doGet() {
  
  var html = HtmlService
      .createTemplateFromFile('student dialogue')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
 
  return html;

//  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
//      .showModalDialog(html, 'Student induction'); 
  
  
}

function processForm(formObject) {

  //retrieves values of fileds entered in form, passed as object with values keyed to form fields names
  
  var studentName = JSON.parse(JSON.stringify(formObject));
  var sheetName = studentName.firstName + " " + studentName.secondName;
  var userType = studentName.userType; //column to filter by
  var responsibility = String.fromCharCode(userType.charCodeAt(0)+1);//gets coloumn letter for column right of usertype
  var yearGroup = studentName.yearGroup;
  var enrollmentDate = studentName.enrollmentDate;
  var start = "Start date: ";
      enrollmentDate = start.concat(enrollmentDate.toString());
 
  
  
  var ss = SpreadsheetApp.openById('1Tvs5BqsSlfyOBfSvfQPlGiSmkW3DoeoBtshvUV86wF4');
  var newSheet = ss.insertSheet(3);
      newSheet.setName(sheetName);
  
      newSheet.getRange("K3").setValue("=query('#induction'!A:P , \"select A where "+userType+" = 'x'\")"); //filters list from induction sheet to include only relevant tasks
      var filteredtasks = newSheet.getRange("K:K").getValues();
      newSheet.getRange("A:A").setValues(filteredtasks);  //copies values to first column so doesn't change (and get out of line with checked tasks) when/if source task list changes
      newSheet.getRange("K:K").clearContent();
      newSheet.getRange("J3").setValue("=query('#induction'!A:P , \"select "+responsibility+" where "+userType+" = 'x'\")"); //filters list from induction sheet to include only relevant tasks
      var filteredResponsibilities = newSheet.getRange("J:J").getValues();
      newSheet.getRange("C:C").setValues(filteredResponsibilities);  //copies values to first column so doesn't change (and get out of line with checked tasks) when/if source task list changes
      newSheet.getRange("J:J").clearContent();
      newSheet.getRange("A1").setValue("='#induction'!"+userType+"1");
      newSheet.getRange("B1").setValue(yearGroup);
      newSheet.getRange("C1").setValue(enrollmentDate);  //not string so messes up return values for listing tasks in UI
      newSheet.setColumnWidth(1, 500);
      newSheet.getRange(2, 1, 1, 3).setValues([["Tasks","Completed","Responsibility"]]);
      
   
 return studentName.firstName+' '+studentName.secondName+' created';
}



function findStudent(sheetName) {
  
  //create task checklist
  
 var taskhtml = HtmlService
      .createTemplateFromFile('checklist')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  
  return taskhtml;

//  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
//      .showModalDialog(html, 'checklist'); 
  
 
}

function debug() {
  
   Logger.log(HtmlService
      .createTemplateFromFile('student dialogue')
      .getCode());
  
  
  
  
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function testViz() {
  
  var html = HtmlService
      .createTemplateFromFile('test viz')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
 
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'test viz'); 

  var htmlMail = html.getContent();
  
  Logger.log(htmlMail);
  
  return htmlMail;

  
}
