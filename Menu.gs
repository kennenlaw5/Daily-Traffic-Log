function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Utilities').addSubMenu(ui.createMenu('Help').addItem('By Phone','menuItem1').addItem('By Email','menuItem2')).addItem('Generate Sheet','duplicate')
  .addItem('New Month', 'newMonth').addToUi();
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
  //Version 1.1
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