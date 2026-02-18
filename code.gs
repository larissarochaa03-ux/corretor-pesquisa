function doPost(e) {
  try {
    // 1. Get the active spreadsheet and the specific sheet
    // ID provided by user: 15VJXE4Wm3kCwfeZjLfXRSRBgXNCAkkLykBC3wmTmO-A
    var ss = SpreadsheetApp.openById('15VJXE4Wm3kCwfeZjLfXRSRBgXNCAkkLykBC3wmTmO-A');
    var sheet = ss.getSheets()[0]; // Assumes data goes to the first sheet

    // 2. Parse the incoming JSON data
    var requestData = JSON.parse(e.postData.contents);
    
    // 3. Prepare the data for a column (vertical)
    // We need a 2D array for setValues: [[val1], [val2], [val3], ...]
    var columnData = [
      [new Date()], // Row 1: Timestamp
      [requestData.nome || ''],              // 1. Nome
      [requestData.perfil || ''],            // 2. Perfil
      [requestData.preferencia || ''],       // 3. Preferência
      [requestData.aparicao || ''],          // 4. Aparição
      [requestData.diferencial || ''],       // 5. Diferencial
      [requestData.inspiracao || ''],        // 6. Inspiração (NOVO)
      [requestData.admiracao || ''],         // 7. Admiração (CHECKBOX)
      [requestData.tipo_imovel || ''],       // 8. Tipo Imóvel
      [requestData.publico || ''],           // 9. Público
      [requestData.imagem || ''],            // 10. Imagem Desejada
      [requestData.estilo_perfil || ''],     // 11. Estilo Perfil (MOVED/UPDATED)
      [requestData.conteudo || ''],          // 12. Conteúdo Preferido
      [requestData.instagram_estado || ''],  // 13. Estado Instagram
      [requestData.meta_instagram || ''],    // 14. Meta Instagram
      [requestData.tipos_conteudo || ''],    // 15. Tipos Conteúdo (CHECKBOX)
      [requestData.frequencia_gravacao || ''], // 16. Frequência
      [requestData.stories_diarios || ''],   // 17. Stories Diários (NOVO)
      [requestData.uso_stories || ''],       // 18. Uso Stories (CHECKBOX)
      [requestData.valores || ''],           // 19. Valores
      [requestData.reconhecimento || ''],    // 20. Reconhecimento (NOVO)
      [requestData.transmissao || ''],       // 21. Transmissão (NOVO)
      [requestData.nao_parecer || ''],       // 22. Não parecer (NOVO)
      [requestData.sensacao || '']           // 23. Sensação (NOVO)
    ];

    // 4. Insert into the next available column
    var lastCol = sheet.getLastColumn();
    var nextCol = lastCol + 1;
    
    // Write data to the next column
    sheet.getRange(1, nextCol, columnData.length, 1).setValues(columnData);

    // 5. Return success response
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// INSTRUÇÕES DE ATUALIZAÇÃO:
// 1. Copie este código inteiro.
// 2. Vá para sua Planilha Google > Extensões > Apps Script.
// 3. Cole este código substituindo o anterior.
// 4. Clique em 'Implantar' (Deploy) > 'Gerenciar implantações' > 'Editar' (ícone lápis) > 'Nova versão'.
// 5. Clique em 'Implantar'.
// 6. O link (URL) NÃO deve mudar se você atualizar a versão existente corretamente, então não precisa alterar no site se fizer assim.
