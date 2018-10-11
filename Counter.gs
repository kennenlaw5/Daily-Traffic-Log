function mgrCount(mgrs,status) {
  //Created By Kennen Lawrence
  //Version 1.0 10/10/18
  
  /* 
  // Debug variables
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  mgrs = sheet.getRange("C2:C").getValues();
  status = sheet.getRange("I2:I").getValues();
  */
  
  var managers = [];
  var found = false;
  var current;
  for (var i = 0; i < mgrs.length; i++) {
    found = false;
    if (mgrs[i][0] != "" && mgrs[i][0].toLowerCase() != "no" && mgrs[i][0].toLowerCase() != "greet") {
      for (var j = 0; j < managers.length && !found; j++) {
        if (mgrs[i][0].toLowerCase() == managers[j][0].toLowerCase()) {
          found = true;
          managers[j][1] += 1;
          if (status[i][0].toLowerCase().indexOf("sold") != -1) {
            managers[j][2] += 1;
          }
        }
      }
      if (!found) {
        current = managers.length;
        managers[current] = [mgrs[i][0], 1, 0];
        if (status[i][0].toLowerCase().indexOf("sold") != -1) {
          managers[current][2] += 1;
        }
      }
    } else if (i+2 < mgrs.length && mgrs[i][0] == "" && mgrs[i+1][0] == "" && mgrs[i+2][0] == "") {
      break;
    }
  }
  if (managers.length == 0) { return "N/A"; }
  return managers;
}
