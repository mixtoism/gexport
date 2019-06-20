function main() {
  doBase();
  doUpdates();
  doDLC();
}

/**
 * Grant sharing permission if needed
 */
function grantPermissionsIfRequired (pending,done) {
  var file;
  var element;
  while (pending.getLastRow() > 0) {
    var element = pending.getSheetValues(1, 1, 1, 1);
    file = DriveApp.getFileById(element[0][0]);
    var filename = file.getName();
    console.log('Granting Sharing acces on ' + filename);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);
    console.log('Granted Sharing acces on ' + filename);
    pending.deleteRow(1);
    done.appendRow([element[0][0],element[0][1]]);
  }
}


function doBase() {
  var pendingPermissionSpread = 'BUFFER_SPREAD';
  var spread = SpreadsheetApp.openById(pendingPermissionSpread);
  var waitingspread = spread.getSheets()[0];
  var readyspread = spread.getSheets()[3];
  grantPermissionsIfRequired(waitingspread,readyspread);
  console.log('Base finished');

  
}

function doUpdates() {
  var pendingPermissionSpread = 'BUFFER_SPREAD';
  var spread = SpreadsheetApp.openById(pendingPermissionSpread);
  var waitingspread = spread.getSheets()[1];
  var readyspread = spread.getSheets()[4];
  grantPermissionsIfRequired(waitingspread,readyspread);
  console.log('Updates finished');
}

function doDLC() {
  var pendingPermissionSpread = 'BUFFER_SPREAD';
  var spread = SpreadsheetApp.openById(pendingPermissionSpread);
  var waitingspread = spread.getSheets()[2];
  var readyspread = spread.getSheets()[5];
  grantPermissionsIfRequired(waitingspread,readyspread);
  console.log('DLC finished');
}
