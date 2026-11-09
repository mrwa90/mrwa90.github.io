// Praktische Infos pro Stadt. Preise sind ungefähre Werte – Tarife ändern sich, bitte vor Ort kurz prüfen.
window.INFOS = {
  Wien: {
    notruf: [
      { nr: '112', was: 'Euro-Notruf (alle Notfälle)' },
      { nr: '144', was: 'Rettung' },
      { nr: '133', was: 'Polizei' },
      { nr: '122', was: 'Feuerwehr' },
      { nr: '141', was: 'Ärztenotdienst (nachts, Wochenende)' }
    ],
    tickets: [
      { name: 'Einzelfahrt (Papier / digital)', preis: 'ca. 3,20 € / 3,00 €' },
      { name: '24 Stunden Wien (Papier / digital)', preis: 'ca. 10,20 € / 9,70 €' },
      { name: '7 Tage Wien (Papier / digital)', preis: 'ca. 28,90 € / 25,20 €' },
      { name: 'Flughafen: S7 ab St. Marx / Railjet ab Hbf', preis: 'ca. 4–5,50 €' },
      { name: 'Flughafen-Zusatz zu Wien-Ticket (ab Stadtgrenze)', preis: 'ca. 2,30–2,50 €' },
      { name: 'Flughafen: CAT als Bus nach Wien Mitte', preis: 'ca. 15 €' }
    ],
    ticketTipp: 'Seit 1.1.2026 gibt es keine 48- und 72-Stunden-Tickets mehr – für euren Aufenthalt lohnt das 7-Tage-Ticket. Kaufen in der App „WienMobil“, an Automaten in jeder U-Bahn-Station und in Trafiken. Papiertickets vor der Fahrt entwerten.',
    trinkgeld: 'Üblich sind etwa 5–10 %. Man gibt das Trinkgeld nicht auf dem Tisch, sondern sagt beim Bezahlen direkt den aufgerundeten Betrag („Machen Sie 25“) oder „Stimmt so“. Im Kaffeehaus rundet man auf. Taxi: aufrunden.',
    sprachen: [{
      name: 'Deutsch (Wienerisch)',
      saetze: [
        { de: 'Hallo', l: 'Grüß Gott / Servus', a: 'Servus ist locker, Grüß Gott höflich' },
        { de: 'Danke', l: 'Danke (schön)', a: '' },
        { de: 'Bitte', l: 'Bitte (schön)', a: '' },
        { de: 'Die Rechnung bitte', l: 'Zahlen, bitte!', a: 'so ruft man den Kellner („Herr Ober“)' },
        { de: 'Wo ist …?', l: 'Wo ist …?', a: '' },
        { de: 'Tschüss', l: 'Baba / Pfiat di', a: 'baba = tschüss' },
        { de: 'Tomaten / Kartoffeln', l: 'Paradeiser / Erdäpfel', a: '' },
        { de: 'Sahne / Tüte', l: 'Obers / Sackerl', a: '' },
        { de: 'Milchkaffee', l: 'Melange', a: 'me-lahnsch' }
      ]
    }]
  },
  Athen: {
    notruf: [
      { nr: '112', was: 'Euro-Notruf (alle Notfälle, auch auf Englisch)' },
      { nr: '166', was: 'Rettung' },
      { nr: '100', was: 'Polizei' },
      { nr: '199', was: 'Feuerwehr' },
      { nr: '1571', was: 'Touristenpolizei (Englisch)' }
    ],
    tickets: [
      { name: 'Einzelticket (90 Minuten, alle Verkehrsmittel)', preis: 'ca. 1,20 €' },
      { name: '24-Stunden-Ticket', preis: 'ca. 4–5 €' },
      { name: '5-Tage-Ticket', preis: 'ca. 8–9 €' },
      { name: 'Flughafen-Ticket Metro / Bus X95 (einfach)', preis: 'ca. 6–9 €' },
      { name: '3-Tage-Touristenticket inkl. 1× Flughafen hin und zurück', preis: 'ca. 20 €' }
    ],
    ticketTipp: 'Tickets an Automaten in Metrostationen oder kontaktlos mit Bankkarte am Drehkreuz. Beim Einsteigen in Bus und Tram immer entwerten bzw. an den Leser halten.',
    trinkgeld: 'Trinkgeld ist nicht im Preis enthalten. Üblich sind 5–10 %, bei kleinen Rechnungen einfach aufrunden. Das Geld lässt man beim Gehen auf dem Tisch liegen. Taxi: aufrunden.',
    sprachen: [{
      name: 'Griechisch',
      saetze: [
        { de: 'Hallo / Guten Tag', l: 'Γειά σας', a: 'já-sas (zu einer Person locker: já-su)' },
        { de: 'Guten Morgen', l: 'Καλημέρα', a: 'ka-li-mé-ra' },
        { de: 'Guten Abend', l: 'Καλησπέρα', a: 'ka-li-spé-ra' },
        { de: 'Danke', l: 'Ευχαριστώ', a: 'ef-cha-ri-stó' },
        { de: 'Bitte', l: 'Παρακαλώ', a: 'pa-ra-ka-ló' },
        { de: 'Die Rechnung bitte', l: 'Τον λογαριασμό, παρακαλώ', a: 'ton lo-ga-rias-mó, pa-ra-ka-ló' },
        { de: 'Wo ist …?', l: 'Πού είναι …;', a: 'pu í-ne …?' },
        { de: 'Ja / Nein', l: 'Ναι / Όχι', a: 'nä / ó-chi' },
        { de: 'Entschuldigung', l: 'Συγγνώμη', a: 'sig-nó-mi' },
        { de: 'Was kostet das?', l: 'Πόσο κάνει;', a: 'pó-so ká-ni?' },
        { de: 'Prost!', l: 'Γειά μας!', a: 'já-mas' }
      ]
    }]
  },
  Barcelona: {
    notruf: [
      { nr: '112', was: 'Euro-Notruf (alle Notfälle, auch Englisch)' },
      { nr: '061', was: 'Rettung / medizinischer Notfall (Katalonien)' },
      { nr: '091', was: 'Policía Nacional (z. B. Diebstahlanzeige)' },
      { nr: '092', was: 'Guardia Urbana (Stadtpolizei)' },
      { nr: '080', was: 'Feuerwehr Barcelona' }
    ],
    tickets: [
      { name: 'Einzelfahrt', preis: 'ca. 2,50–3 €' },
      { name: 'T-casual (10 Fahrten, eine Person)', preis: 'ca. 12–13 €' },
      { name: 'Hola Barcelona 72 Stunden (inkl. Flughafen-Metro)', preis: 'ca. 25–27 €' },
      { name: 'Flughafen: Metro L9 Sud (Flughafenticket)', preis: 'ca. 5,50 €' },
      { name: 'Flughafen: Aerobús (einfach)', preis: 'ca. 7 €' },
      { name: 'Montserrat: Trans Montserrat (Bahn + Zahnradbahn)', preis: 'ca. 40–45 €' }
    ],
    ticketTipp: 'Für eine Woche lohnt meist pro Person eine T-casual (wenn man nicht viel fährt) oder die T-usual (30 Tage, ca. 20–25 €, nur mit Ausweis). Automaten in allen Metrostationen, auch auf Deutsch.',
    trinkgeld: 'Trinkgeld ist kein Muss. Bei gutem Service aufrunden oder 5–10 % geben, in Tapasbars ein paar Münzen liegen lassen. Taxi: aufrunden.',
    sprachen: [
      {
        name: 'Spanisch',
        saetze: [
          { de: 'Hallo', l: 'Hola', a: 'ó-la' },
          { de: 'Guten Morgen / Tag', l: 'Buenos días', a: 'bu-é-nos dí-as' },
          { de: 'Danke', l: 'Gracias', a: 'grá-thi-as' },
          { de: 'Bitte', l: 'Por favor', a: 'por fa-bór' },
          { de: 'Die Rechnung bitte', l: 'La cuenta, por favor', a: 'la ku-én-ta, por fa-bór' },
          { de: 'Wo ist …?', l: '¿Dónde está …?', a: 'dón-de es-tá …?' },
          { de: 'Entschuldigung', l: 'Perdón', a: 'per-dón' },
          { de: 'Was kostet das?', l: '¿Cuánto cuesta?', a: 'ku-án-to ku-és-ta?' },
          { de: 'Prost!', l: '¡Salud!', a: 'sa-lúd' }
        ]
      },
      {
        name: 'Katalanisch',
        saetze: [
          { de: 'Hallo', l: 'Hola', a: 'ó-la' },
          { de: 'Guten Morgen / Tag', l: 'Bon dia', a: 'bon dí-a' },
          { de: 'Danke', l: 'Gràcies', a: 'grá-si-əs' },
          { de: 'Bitte', l: 'Si us plau', a: 'si us pláu' },
          { de: 'Die Rechnung bitte', l: 'El compte, si us plau', a: 'əl kóm-tə, si us pláu' },
          { de: 'Wo ist …?', l: 'On és …?', a: 'on es …?' },
          { de: 'Entschuldigung', l: 'Perdó', a: 'pər-dó' },
          { de: 'Was kostet das?', l: 'Quant costa?', a: 'ku-án kós-ta?' },
          { de: 'Tschüss', l: 'Adéu', a: 'ə-déu' },
          { de: 'Prost!', l: 'Salut!', a: 'sə-lút' }
        ]
      }
    ]
  }
};
