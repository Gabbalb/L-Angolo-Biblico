// Codice da incollare in Google Apps Script (script.google.com)
// Collegato a un Foglio Google con i fogli "Libri" e "Ordini"

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Libri");
  if (!sheet) return JSON_RESPONSE({ error: "Foglio 'Libri' non trovato" });
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const books = rows.map(row => {
    let book = {};
    headers.forEach((header, index) => {
      book[header.toLowerCase()] = row[index];
    });
    return book;
  });
  
  return JSON_RESPONSE(books);
}

// Struttura colonne consigliata per il foglio "Libri":
// ID, Titolo, Autore, Trama, Pagine, Categoria, Immagine

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const orderSheet = ss.getSheetByName("Ordini");
    if (!orderSheet) return JSON_RESPONSE({ error: "Foglio 'Ordini' non trovato" });
    
    const orderData = JSON.parse(e.postData.contents);
    
    // headers: Timestamp, Mail, Nome, Cognome, Titolo, Autore, Quantità, Stato
    orderData.items.forEach(item => {
      orderSheet.appendRow([
        new Date(),
        orderData.email,
        orderData.name,
        orderData.surname,
        item.title,
        item.author,
        item.quantity,
        "Nuovo"
      ]);
    });
    
    // Notifica Admin
    const adminEmail = "balbiani.gabriele@gmail.com"; // Email dell'admin
    const subjectAdmin = "Nuovo Ordine Libri Gratuiti";
    const bodyAdmin = `Nuovo ordine da ${orderData.name} ${orderData.surname} (${orderData.email}).\n\nArticoli:\n` + 
      orderData.items.map(i => `- ${i.title} (${i.quantity})`).join("\n");
    
    MailApp.sendEmail(adminEmail, subjectAdmin, bodyAdmin);
    
    // Notifica Utente
    const subjectUser = "Conferma Richiesta Libri - L'Angolo Biblico";
    const bodyUser = `Ciao ${orderData.name},\n\nabbiamo ricevuto la tua richiesta per i seguenti libri:\n\n` +
      orderData.items.map(i => `- ${i.title} (Quantità: ${i.quantity})`).join("\n") +
      `\n\nTi contatteremo presto per la consegna.\n\nUn caro saluto,\nL'Angolo Biblico`;
    
    MailApp.sendEmail(orderData.email, subjectUser, bodyUser);
    
    return JSON_RESPONSE({ status: "success" });
  } catch (err) {
    return JSON_RESPONSE({ status: "error", message: err.toString() });
  }
}

function JSON_RESPONSE(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
