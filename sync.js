function main() {
  base();
  updates();
  dlc();
}


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
  var dstfiles = dstfldr.getFiles();
  
  var copiedFiles = [];
  while (files.hasNext()) {
    f=files.next();
    //console.log('Copying ' + f.getName());
    var name =f.getName
    if (! (dstfldr.getFilesByName(name)).hasNext() ) {  
      var newfile = f.makeCopy(dstfldr);
      sheet.appendRow([newfile.getId(),name]);
      console.log('Copied ' + name);
      
    }
    cont += 1;
    if (cont%30) { 
      scriptProperties.setProperty('copyTOKEN' + src, files.getContinuationToken());
    }
  }
  scriptProperties.deleteProperty('copyTOKEN' + src);
  return;  
}



function base() {
  var stash_base              = 'DEST_FOLDER_ID';
  var source_base             = 'SOURCE_FOLDER_ID';
  var pendingPermissionSpread = 'BUFFER_SPREAD';
  var spreadsheet = SpreadsheetApp.openById(pendingPermissionSpread);
  var sheet = spreadsheet.getSheets()[0];
  copy(source_base,stash_base,sheet);
  console.log('Base finished');
  return;
  
}

function updates() {
  var stash_updates = 'DEST_FOLDER_ID';  
  var source_updates   = 'SOURCE_FOLDER_ID';
  var pendingPermissionSpread = 'BUFFER_SPREAD';
  var spreadsheet = SpreadsheetApp.openById(pendingPermissionSpread);
  var sheet = spreadsheet.getSheets()[1];
  copy(source_updates,stash_updates,sheet);
  console.log('Updates finished');
  return;

  
}

function dlc() {
  var stash_dlc = 'DEST_FOLDER_ID';
  var hbg_dlc   = 'SOURCE_FOLDER_ID';
  var pendingPermissionSpread = 'BUFFER_SPREAD';
  var spreadsheet = SpreadsheetApp.openById(pendingPermissionSpread);
  var sheet = spreadsheet.getSheets()[2];
  copy(hbg_dlc,stash_dlc,sheet);
  console.log('DLC finished');
  return;

}



