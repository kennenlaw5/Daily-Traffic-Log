function mgrCount(range) {
  //Created By Kennen Lawrence
  //Version 1.0 10/10/18
  
  /* 
  // Debug variables
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  range = sheet.getRange("C2:I").getValues();
  */
  
  var managers = [];
  var found = false;
  var current;
  for (var i = 0; i < range.length; i++) {
    found = false;
    if (range[i][0] != "" && range[i][0].toLowerCase() != "no" && range[i][0].toLowerCase() != "greet") {
      for (var j = 0; j < managers.length && !found; j++) {
        if (range[i][0].toLowerCase() == managers[j][0].toLowerCase()) {
          found = true;
          managers[j][1] += 1;
          if (range[i][range[i].length-1].toLowerCase().indexOf("sold") != -1) {
            managers[j][2] += 1;
          }
        }
      }
      if (!found) {
        current = managers.length;
        managers[current] = [range[i][0], 1, 0];
        if (range[i][range[i].length-1].toLowerCase().indexOf("sold") != -1) {
          managers[current][2] += 1;
        }
      }
    }
  }
  if (managers.length == 0) { return "N/A"; }
  return managers;
}
