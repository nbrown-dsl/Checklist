
function activeUser() {
  
  var eMail = Session.getActiveUser().getEmail();
  var userName = eMail.split("@");
  
  return userName[0];
  
  
}

