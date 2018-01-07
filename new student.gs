//serves checklist interface
// url of webapp called with spreadsheet id and list paramters
// ?ssId=1kNa3-pDtp1W0ZrRzxCK49Uf6hA15HewvjpyPmzub2UQ&list=trip
//list parameter same name at html file name that is served as interface

function doGet(e) {
    
  var html = HtmlService.createTemplateFromFile('workflowUI');
       
  return html.evaluate()
         .setTitle('Workflows')
         .setFaviconUrl('https://cdn0.iconfinder.com/data/icons/everyday-objects-line-art-1/128/clipboard-128.png')
         .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function processForm(formObject) {

  //retrieves values of fileds entered in form, passed as object with values keyed to form fields names
  
  var studentName = JSON.parse(JSON.stringify(formObject));
  var sheetName = studentName.firstName + " " + studentName.secondName;
  var userType = studentName.userType; //column to filter by *must correspond to column headings for user type on checklist sheet*
  var responsibility = String.fromCharCode(userType.charCodeAt(0)+1);//gets coloumn letter for column right of usertype
  var yearGroup = studentName.yearGroup;
  var enrollmentDate = studentName.enrollmentDate;
  var start = "Start / Leaving date: ";
      enrollmentDate = start.concat(enrollmentDate.toString());
  
  var userProperties = PropertiesService.getUserProperties();
  var ssId = userProperties.getProperty('ssId');
 
  var ss = SpreadsheetApp.openById(ssId);
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
  
  
var maxRows = newSheet.getMaxRows(); 
var lastRow = newSheet.getLastRow();
if (maxRows-lastRow != 0){
      newSheet.deleteRows(lastRow+1, maxRows-lastRow);
      }
  
      
   
 return studentName.firstName+' '+studentName.secondName+' added to list';
}

//get username
function activeUser() {
  
  var eMail = Session.getActiveUser().getEmail();
  var userName = eMail.split("@");
  
  return userName[0];
  
  
}




function findStudent(sheetName) {
  
  //create task checklist
  
 var taskhtml = HtmlService
      .createTemplateFromFile('checklist')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  
  return taskhtml;

  
 
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


