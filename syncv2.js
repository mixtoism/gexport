function copy(src,dst,sheet) {
  var scriptProperties = PropertiesService.getScriptProperties();
  var continuationToken = scriptProperties.getProperty('copyTOKEN' + src);
  var files;
  var srcfldr = DriveApp.getFolderById(src);
  if (continuationToken == null) {
    files = srcfldr.getFiles();
  }
  else {
    files = DriveApp.continueFileIterator(continuationToken);
  }
  var cont = 1;
  var dstfldr = DriveApp.getFolderById(dst);
  range = sheet.getRange(1,1,sheet.getLastRow(), 1);
  var arr = range.getValues();
  var values = arr.join().split(',');
  while (files.hasNext()) {
    f=files.next();
    var name =f.getName();
    if (!(values.indexOf(name) + 1) ) {
      var newfile = f.makeCopy(dstfldr);
      newfile.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);
      var filename = name;//newfile.getName();
      var url = newfile.getUrl();
      sheet.appendRow([filename, '=hyperlink("' + url + '";"' + url + '")']);
      console.log('Copied ' + name);
      
    }
    cont += 1;
    if (cont%100) { 
      scriptProperties.setProperty('copyTOKEN' + src, files.getContinuationToken());
    }
  }
  scriptProperties.deleteProperty('copyTOKEN' + src);
  sheet.sort(1, true);
  return;  
}



function base() {
  var stash_base              = '';
  var hbg_base                = '';
  var pendingPermissionSpread = '';
  var spreadsheet = SpreadsheetApp.openById(pendingPermissionSpread);
  var sheet = spreadsheet.getSheets()[0];
  copy(hbg_base,stash_base,sheet);
  console.log('Base finished');
  return;
  
}

function updates() {
  var stash_updates = '';  
  var hbg_updates   = '';
  var pendingPermissionSpread = '';
  var spreadsheet = SpreadsheetApp.openById(pendingPermissionSpread);
  var sheet = spreadsheet.getSheets()[1];
  copy(hbg_updates,stash_updates,sheet);
  console.log('Updates finished');
  return;

  
}

function dlc() {
  var stash_dlc = '';
  var hbg_dlc   = '';
  var pendingPermissionSpread = '';
  var spreadsheet = SpreadsheetApp.openById(pendingPermissionSpread);
  var sheet = spreadsheet.getSheets()[2];
  copy(hbg_dlc,stash_dlc,sheet);
  console.log('DLC finished');
  return;

}
