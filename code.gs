function doPost(e) {
  try {
    // 1. Get the active spreadsheet and the specific sheet
    // ID provided by user: 15VJXE4Wm3kCwfeZjLfXRSRBgXNCAkkLykBC3wmTmO-A
    var ss = SpreadsheetApp.openById('15VJXE4Wm3kCwfeZjLfXRSRBgXNCAkkLykBC3wmTmO-A');
    var sheet = ss.getSheets()[0]; // Assumes data goes to the first sheet

    // 2. Parse the incoming JSON data
    // The data comes in as a string in the post body
    var requestData = JSON.parse(e.postData.contents);
    
    // 3. Prepare the data for a column (vertical)
    // We need a 2D array for setValues: [[val1], [val2], [val3], ...]
    var columnData = [
      [new Date()], // Row 1: Timestamp
      [requestData.nome || ''],
      [requestData.perfil || ''],
      [requestData.preferencia || ''],
      [requestData.aparicao || ''],
      [requestData.diferencial || ''],
      [requestData.elogios || ''],
      [requestData.tipo_imovel || ''],
      [requestData.publico || ''],
      [requestData.imagem || ''],
      [requestData.conforto_video || ''],
      [requestData.conteudo || ''],
      [requestData.instagram_estado || ''],
      [requestData.meta_instagram || ''],
      [requestData.foco_trabalho || ''],
      [requestData.frequencia_gravacao || ''],
      [requestData.marca_palavra || ''],
      [requestData.valores || ''],
      [requestData.estilo_perfil || '']
    ];

    // 4. Insert into the next available column
    // getLastColumn() returns the index of the last column with content
    var lastCol = sheet.getLastColumn();
    var nextCol = lastCol + 1;
    
    // getRange(row, column, numRows, numColumns)
    // We start at row 1, nextCol, for the length of data, 1 column wide
    sheet.getRange(1, nextCol, columnData.length, 1).setValues(columnData);

    // 5. Return success response
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Instruction:
// 1. Copy this code.
// 2. Go to your Google Sheet > Extensions > Apps Script.
// 3. Paste this code, replacing any existing code.
// 4. Click 'Deploy' > 'New deployment'.
// 5. Select type: 'Web app'.
// 6. Description: 'Form API'.
// 7. Execute as: 'Me'.
// 8. Who has access: 'Anyone' (IMPORTANT).
// 9. Click 'Deploy'.
// 10. Copy the 'Web App URL' and paste it into script.js.
