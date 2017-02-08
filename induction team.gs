
//returns array of email and first names of all editors and viewers of doc with given fileid

function teamNames(fileId) {
// Log the email address of all users who have access to spreadsheet.
 var file = DriveApp.getFileById(fileId);
 var teamArray = [];
  
 var viewers = file.getViewers();
 var editors = file.getEditors();
 var owner   = file.getOwner();
  
 var team = editors.concat(viewers,owner);
 
 for (var i = 0; i < team.length; i++) {
   var firstName = team[i].getName().split(" ");
   teamArray[i] = { name: firstName[0] , email: team[i].getEmail() }
 }
  
  
  
 return teamArray;
 
}