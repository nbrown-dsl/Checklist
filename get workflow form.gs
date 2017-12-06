//workflow form
function doGetxxx(e) {

var html = HtmlService.createTemplateFromFile('workflowForm');
       
  return html.evaluate()
         .setTitle('workflow form')
         .setFaviconUrl('https://cdn0.iconfinder.com/data/icons/everyday-objects-line-art-1/128/clipboard-128.png')
         .setSandboxMode(HtmlService.SandboxMode.IFRAME);


}



//returns array of objects keyed to first column cells of spreadsheet
//returns header data pertaining to each field (table cell ref, datatype)
// plus returns datalist associated with the field

function getFormData() {
   
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1XMkoHSu19RD0VOVAl9vqqawMLx2IamSpHVsVinrpfJQ/edit#gid=610269614')
  
  var data = ss.getRangeByName('headerData').getValues(); //as object[][] 
  var dataOptions = ss.getRangeByName('dataOptions').getValues(); //as object[][] //list of types in how data listed eg radio button, checkbox etc
  var dataLists = ss.getRangeByName('listData').getValues(); //list of data to appear (eg levels 1,2,3,)
  
  var headerData = [];
 
  
  //create array of objects keyed to first column descriptions. Only columns with datatype are stored
  for (var i=1; i<data[0].length; i++) {
    
    if (data[1][i]) { //if column has datatype defined in row 2 stores column data
      headerData[i]={};
      for (var r=0; r<data.length; r++) {
      headerData[i][data[r][0]] = data[r][i];
      
      }
      
    var rangeName = headerData[i].dataListRange;
    var id = headerData[i].id;
   
        
    var dataListData;
    
    if (ss.getRangeByName(rangeName)) {
      dataListData = ss.getRangeByName(rangeName).getValues(); //returned as 2d object[][] / these values lists are in 1 column only ie object[i][0]
      dataListData = dataListData.map(function(value){ return value[0];}); //returns as 1d array of values
    }
      else if ( headerData[i].dataType == "number" ) { dataListData = [""]; } 
      else if ( headerData[i].dataType == "date" ) { dataListData = [""]; } 
      
      else { dataListData = ["data not found"]; }
      
    headerData[i].dataList = dataListData;  //and adds data associated with list header
    }  
  }
  
  var headerData = headerData.filter(function(el) { return (el);}); //removes null/undefined elements from array
  
  var headerDataString = JSON.stringify(headerData); //makes acceptable for docservice as string. is parsed back to array for reading
   
  
  
  return headerData;
  
}
