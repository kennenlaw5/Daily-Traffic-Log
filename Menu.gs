function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Utilities').addSubMenu(ui.createMenu('Help').addItem('By Phone','menuItem1').addItem('By Email','menuItem2')).addToUi();
  var message = 'The spreadsheet has loaded successfully! Have a great day!';
  var title = 'Complete!';
  SpreadsheetApp.getActiveSpreadsheet().toast(message, title);
}

function menuItem1() {
  SpreadsheetApp.getUi().alert('Call or text (720) 317-5427');
}

function menuItem2() {
  //Created By Kennen Lawrence
  var ui = SpreadsheetApp.getUi();
  var input = ui.prompt('Email The Spreadsheet Guy','Describe the issue you\'re having in the box below, then press "Ok" to submit your issue via email:',ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.CANCEL) {
    SpreadsheetApp.getActiveSpreadsheet().toast("Email was not sent to the Spreadsheet Guy.", 'Action Cancelled');
    return;
  }
  MailApp.sendEmail('kennen.lawrence@a2zsync.com','HELP Daily Traffic Log',input.getResponseText(),{name:getName()});
}

function getName(){
  //Created By Kennen Lawrence
  //Version 1.01
  var email = Session.getActiveUser().getEmail();
  var name, first, last;
  name = email.split("@schomp.com");
  name=name[0];
  name=name.split(".");
  first=name[0];
  last=name[1];
  first= first[0].toUpperCase() + first.substring(1);
  last=last[0].toUpperCase() + last.substring(1);
  name=first+" "+last;
  return name;
}

function duplicate() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var master = ss.getSheetByName('MASTER');
  var sheetDate, month, day;
  var check = false;
  var manualOverride = false;
  
  while (!check && manualOverride) {
    var ui = SpreadsheetApp.getUi();
    check = true;
    sheetDate = ui.prompt('Enter Date', 'Please enter the date in the format of M/D.'+
                          '\nFor consistency do not place a leading "0" on months or days less than 10.', ui.ButtonSet.OK_CANCEL);
    if (sheetDate.getSelectedButton() == ui.Button.CANCEL) { return; }
    sheetDate = sheetDate.getResponseText().replace('-','/');
    if (sheetDate.indexOf('/') == -1) { 
      ui.alert('Format Error:'
               ,'You have entered the date in an incorrect format. The month and day must be sepparated by a "/". Please try again with the correct format.'
               ,ui.ButtonSet.OK);
      check = false;
    } else {
      month = sheetDate.split('/')[0];
      day = sheetDate.split('/')[1];
      Logger.log(parseInt(month, 10) + ' ' + parseInt(day, 10));
      if (!isNaN(parseInt(month, 10)) && month.length > 1 && parseInt(month, 10) < 10 && month.indexOf('0') != -1) {
        month = month.replace('0','');
      }
      if (!isNaN(parseInt(day, 10)) && month.length > 1 && parseInt(day, 10) < 10 && day.indexOf('0') != -1) {
        day = day.replace('0','');
      }
      if (isNaN(parseInt(month, 10)) || parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
        ui.alert('Bad Month', 'The month must be a valid month between 1 and 12. You\'re entry of "'+month+'" is not valid. Please Try again.', ui.ButtonSet.OK);
        check = false;
      }
      if (isNaN(parseInt(day, 10)) || parseInt(day, 10) < 1 || parseInt(day, 10) > 12) {
        ui.alert('Bad Day', 'The day must be a valid day between 1 and 31. Your entry of "'+day+'" is not valid. Please Try again.', ui.ButtonSet.OK);
        check = false;
      }
    }
  }
  if (manualOverride) { sheetDate = month + '/' + day; }
  else {
    sheetDate = new Date();
    if (sheetDate.toString().split(' ')[0] == 'Sun') {
      Logger.log('Function will not execute automatically on Sundays!');
      return;
    }
    sheetDate = sheetDate.toLocaleDateString().split(',')[0].split(' ');
    sheetDate[0] = sheetDate[0].substring(0,3);
    sheetDate = sheetDate.join(' ');
  }
  if (ss.getSheetByName(sheetDate) != null) { 
    throw 'The sheet "' + sheetDate + '" already exists. Manual Override is required.';
    return;
  }
  ss.setActiveSheet(master.copyTo(ss).setName(sheetDate))
  ss.moveActiveSheet(2);
}