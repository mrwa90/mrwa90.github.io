// Ankunft, Unterkunft und Abreise – ausführliche Wege pro Stadt.
// Recherchiert am 8.11.2026 (wien.info, Wiener Linien, ÖBB, Athens Airport/OASA-Angaben, TMB/Aerobús/Rodalies-Angaben und Reiseportale).
// Preise ändern sich – immer vor Ort prüfen.
window.ANREISE = window.ANREISE || {};
window.ANREISE.wab2026 = {
  stand: '8. November 2026',
  quellen: 'Offiziell bestätigt: TMB Barcelona (T-casual 13,00 €, Flughafenticket 5,90 €, gültig seit 15.1.2026) und OASA Athen (Metro Flughafen 9,00 €, Expressbus X95 5,50 €). Wien (S7-Änderung ab 7.9.2026) laut wien.info; Wiener Tarife aus Medienberichten, weil die Seiten von Wiener Linien und ÖBB nicht abrufbar waren. Taxi-Festpreise Athen aus Presseberichten. Alle Preise bitte vor Ort prüfen.',
  Wien: {
    knoten: [
      { icon: '🚉', name: 'Wien Hauptbahnhof', info: 'Größter Bahnhof Wiens, hier kommt euer Nachtzug an. U1, S-Bahn, Straßenbahn D, O, 18 und Busse. Einkaufspassage mit Bäckereien und Supermärkten, auch sonntags offen.' },
      { icon: '🚉', name: 'Wien Meidling / Westbahnhof', info: 'Weitere Fernbahnhöfe (Westbahnhof v. a. für Züge Richtung Salzburg/Westbahn). Für euch nicht nötig.' },
      { icon: '✈️', name: 'Flughafen Wien-Schwechat (VIE)', info: 'Etwa 18 km südöstlich. Ein Terminalgebäude mit Bereichen 1 und 3. Liegt außerhalb der Wiener Kernzone – normale Wiener Tickets reichen dort nicht.' },
      { icon: '⚠️', name: 'Bauarbeiten S-Bahn (7.9.2026 – Ende Okt. 2027)', info: 'Die Stammstrecke Praterstern – Hauptbahnhof ist gesperrt (Rennweg und Wien Mitte ohne S-Bahn). Die S7 vom Flughafen endet deshalb in St. Marx – praktisch für euer Hotel! Der CAT fährt als Bus nach Wien Mitte.' }
    ],
    strecken: [
      {
        titel: 'Hauptbahnhof → B&B Hotel Wien St. Marx', datum: 'Sa, 14.11. – Ankunft Nachtzug',
        von: 'Wien Hauptbahnhof', nach: 'Litfaßstraße 2, 1110 Wien',
        optionen: [
          { name: 'Straßenbahn 18 + kurzer Fußweg', icon: '🚋', empfohlen: true,
            schritte: ['Im Hauptbahnhof den Schildern „Straßenbahn 18“ folgen (Haltestelle Hauptbahnhof Ost / Quartier Belvedere).', 'Linie 18 Richtung Schlachthausgasse bis „St. Marx“ (ca. 10 Min.).', 'Von dort ca. 8 Min. zu Fuß zur Litfaßstraße 2. Alternativ ab St. Marx Linie 71 eine Station bis „Litfaßstraße“ (2 Min. zum Hotel).'],
            dauer: 'ca. 20–25 Min.', preis: 'Einzelfahrt 3,20 € (Papier) / 3,00 € (digital) – oder gleich das 7-Tage-Ticket', ticket: 'Automat in der Station, App „WienMobil“, Trafik im Bahnhof' },
          { name: 'Taxi', icon: '🚕', schritte: ['Taxistand am Ausgang Hauptbahnhof (Südtiroler Platz / Gertrude-Fröhlich-Sandner-Straße).', 'Direkt zur Litfaßstraße 2.'], dauer: 'ca. 10 Min.', preis: 'ca. 15–20 €', ticket: 'Im Taxi bezahlen (Karte meist möglich)' }
        ],
        empfehlung: 'Straßenbahn 18 – direkt, ohne Treppen, mit Koffer bequem. Kauft am Bahnhof gleich das 7-Tage-Ticket.'
      },
      {
        titel: 'B&B Hotel St. Marx → Flughafen Wien', datum: 'Di, 17.11. – Flug nach Athen',
        von: 'Litfaßstraße 2, 1110 Wien', nach: 'Flughafen Wien',
        optionen: [
          { name: 'S-Bahn S7 ab St. Marx', icon: '🚆', empfohlen: true,
            schritte: ['Vom Hotel ca. 6–8 Min. zu Fuß zur S-Bahn-Station „St. Marx“.', 'S7 Richtung Flughafen Wien / Wolfsthal – fährt seit 7.9.2026 ab St. Marx (Endstation).', 'Aussteigen „Flughafen Wien“ – der Bahnsteig liegt direkt unter dem Terminal.'],
            dauer: 'ca. 20–25 Min. Fahrt, etwa alle 30 Min.', preis: 'ca. 4–5,50 € pro Person; wer ein gültiges Wien-Ticket hat, braucht nur den Zusatz „Außenzone ab Stadtgrenze“ (ca. 2,30–2,50 €)', ticket: 'ÖBB-Automat am Bahnsteig, ÖBB-App oder WienMobil-App – Ziel „Flughafen Wien“ wählen' },
          { name: 'Railjet ab Hauptbahnhof', icon: '🚄', schritte: ['Straßenbahn 18 vom Hotel (Haltestelle St. Marx) zum Hauptbahnhof (ca. 10 Min.).', 'Railjet/ICE nonstop zum Flughafen, zweimal pro Stunde.'], dauer: 'ca. 40 Min. gesamt (15 Min. Zug)', preis: 'ca. 5,50 € + ggf. Straßenbahn', ticket: 'ÖBB-App / Automat' },
          { name: 'Taxi / Flughafentaxi', icon: '🚕', schritte: ['Taxi rufen lassen (Rezeption) oder Fahrdienst-App.', 'Vorab-Festpreis-Angebote der Flughafentaxis sind oft günstiger als der Taxameter.'], dauer: 'ca. 20 Min.', preis: 'ca. 35–45 €', ticket: 'Im Taxi' }
        ],
        empfehlung: 'S7 ab St. Marx – euer Hotel liegt praktisch an der Flughafenlinie. Mindestens 2 Stunden vor Abflug am Flughafen sein.'
      }
    ],
    tipps: [
      'Ticket für den Aufenthalt: 7-Tage-Ticket Wien (ca. 28,90 € Papier / 25,20 € digital) – gilt ab Entwertung 7 Kalendertage in der Kernzone. Für 4 Tage meist günstiger als mehrere 24-Stunden-Tickets (10,20 € / 9,70 €). 48- und 72-Stunden-Tickets gibt es seit 1.1.2026 nicht mehr.',
      'Das Flughafen-Teilstück liegt außerhalb der Kernzone: Zum Wien-Ticket braucht ihr für S7/Railjet ein Zusatzticket ab Stadtgrenze.',
      'Papiertickets vor Fahrtantritt entwerten (blaue Automaten). Digitale Tickets in der WienMobil-App gelten sofort.',
      'Gepäck: In Straßenbahn und S-Bahn kostenlos, aber Gänge freihalten. Hotel bewahrt Koffer am Abreisetag meist auf.',
      'Taxi: nur offizielle Taxis (Dachschild) oder Apps nutzen; vorher Preis für den Flughafen fragen.'
    ]
  },
  Athen: {
    knoten: [
      { icon: '✈️', name: 'Flughafen Athen „Eleftherios Venizelos“ (ATH)', info: 'Etwa 30 km östlich der Stadt. Ein Terminal (Haupt- und Satellitengebäude). Metro, S-Bahn (Proastiakos), Express-Busse und Taxis direkt vor dem Gebäude.' },
      { icon: '🚇', name: 'Syntagma', info: 'Zentraler Umsteigeknoten (Metro M2 rot & M3 blau), Endpunkt des Flughafenbusses X95. Ca. 7 Min. zu Fuß zu eurer Unterkunft.' },
      { icon: '🚇', name: 'Akropoli', info: 'Metro M2 – ca. 6 Min. zu Fuß zur Kekropos 14.' },
      { icon: '🚉', name: 'Larissis (Hauptbahnhof)', info: 'Bahnhof für Fernzüge (z. B. Thessaloniki). Für euch nicht nötig.' },
      { icon: '⛴️', name: 'Hafen Piräus', info: 'Fähren zu den Inseln, Metro M1 und Tram.' }
    ],
    strecken: [
      {
        titel: 'Flughafen Athen → Kekropos 14 (Plaka)', datum: 'Di, 17.11. – Ankunft aus Wien',
        von: 'Athens International Airport', nach: 'Kekropos 14, Athen 105 58',
        optionen: [
          { name: 'Metro M3 (blau) + kurzer Fußweg', icon: '🚇', empfohlen: true,
            schritte: ['Im Terminal Schildern „Metro/Train“ folgen (über die Brücke zum Bahnhof).', 'Flughafenticket am Automaten kaufen (oder kontaktlos mit Bankkarte am Drehkreuz).', 'M3 Richtung Dimotiko Theatro bis „Syntagma“ (ca. 40 Min.).', 'Ausgang Plaka/Mitropoleos, dann ca. 7 Min. zu Fuß zur Kekropos 14 (leicht bergauf).'],
            dauer: 'ca. 50–55 Min.', preis: '9,00 € pro Person (offiziell OASA), Ticket gilt 90 Min.', ticket: 'Automaten/Schalter am Flughafenbahnhof – oder kontaktlos mit Bankkarte am Drehkreuz (dieselbe Karte beim Ein- und Ausgang antippen)' },
          { name: 'Expressbus X95', icon: '🚌', schritte: ['Haltestelle vor dem Ankunftsbereich (Ausgang 4/5).', 'Bus X95 bis Endstation „Syntagma“ (fährt rund um die Uhr).', 'Ca. 7 Min. zu Fuß zur Unterkunft.'], dauer: 'ca. 60–90 Min. (je nach Verkehr)', preis: '5,50 € (offiziell OASA)', ticket: 'Kiosk an der Haltestelle' },
          { name: 'Taxi (Festpreis)', icon: '🚕', schritte: ['Nur am offiziellen Taxistand (gelbe Taxis) einsteigen.', 'Festpreis ins Zentrum vorher bestätigen lassen – Maut und Gepäck inklusive.', 'Fahrer zur Kekropos 14 (Plaka) – Gassen sind eng, evtl. letzte Meter zu Fuß.'], dauer: 'ca. 35–50 Min.', preis: 'Festpreis: Laut Berichten seit 18.9.2026 50 € (Tag) / 65 € (0–5 Uhr), vorher 40 € / 55 € – am Stand prüfen', ticket: 'Im Taxi, Quittung verlangen' }
        ],
        empfehlung: 'Metro M3 – schnell, staufrei, günstig. Bei später Ankunft (nach ca. 23:30 Uhr) oder viel Gepäck: Taxi zum Festpreis.'
      },
      {
        titel: 'Kekropos 14 → Flughafen Athen', datum: 'Sa, 21.11. – Flug nach Barcelona',
        von: 'Kekropos 14, Athen 105 58', nach: 'Athens International Airport',
        optionen: [
          { name: 'Metro M3 ab Syntagma', icon: '🚇', empfohlen: true,
            schritte: ['Ca. 7 Min. zu Fuß zur Station Syntagma.', 'Flughafenticket kaufen.', 'M3 in Richtung „Aerodromio“ (Airport) nehmen – Achtung: nur etwa jeder zweite Zug fährt bis zum Flughafen, die anderen enden in Doukissis Plakentias (dort ggf. umsteigen).'],
            dauer: 'ca. 50 Min.', preis: '9,00 € (offiziell OASA)', ticket: 'Automat in Syntagma oder kontaktlos mit Bankkarte (dieselbe Karte beim Ein- und Ausgang)' },
          { name: 'Expressbus X95', icon: '🚌', schritte: ['Abfahrt Syntagma (Amalias-Straße, beim Parlament).'], dauer: 'ca. 60–90 Min.', preis: '5,50 € (offiziell OASA)', ticket: 'Kiosk an der Haltestelle oder kontaktlos mit Bankkarte' },
          { name: 'Taxi (Festpreis)', icon: '🚕', schritte: ['Gastgeber oder App (z. B. FreeNow, Uber vermittelt nur Taxis) – Festpreis gilt auch Richtung Flughafen.'], dauer: 'ca. 35–50 Min.', preis: 'Festpreis 50 € / 65 € (Stand Sept. 2026)', ticket: 'Im Taxi' }
        ],
        empfehlung: 'Metro M3 ab Syntagma, rechtzeitig losgehen (2 Std. vor Abflug am Flughafen sein) und auf den richtigen Zug achten.'
      }
    ],
    tipps: [
      'Im Zentrum (Plaka, Akropolis, Monastiraki, Syntagma) ist fast alles zu Fuß erreichbar. Für weitere Fahrten: 90-Minuten-Ticket ca. 1,20 €, 24 h ca. 4–5 €, 5 Tage ca. 8–9 € (gelten nicht zum Flughafen).',
      '3-Tage-Touristenticket (ca. 20 €) enthält eine Hin- und Rückfahrt zum Flughafen – lohnt nur, wenn die Rückfahrt innerhalb der 3 Tage liegt (bei euch nicht: Abflug am 4. Tag).',
      'Taxi: Nur offizielle gelbe Taxis am Stand, Festpreis ins Zentrum ist gesetzlich – lasst euch nicht auf „Taxameter“ ein. Quittung verlangen.',
      'Taschendiebe vor allem in der Metro-Linie M1 (Monastiraki – Piräus) und auf vollen Plätzen.',
      'Kontaktloses Bezahlen mit Bankkarte am Drehkreuz funktioniert für Einzelfahrten.'
    ]
  },
  Barcelona: {
    knoten: [
      { icon: '✈️', name: 'Flughafen Barcelona-El Prat (BCN), Terminal 1', info: 'Neueres Terminal, u. a. Vueling, Lufthansa, Eurowings. Aerobús A1, Metro L9 Sud. Kostenloser Shuttlebus zu T2 (ca. 10–15 Min.).' },
      { icon: '✈️', name: 'Flughafen El Prat, Terminal 2 (T2A/B/C)', info: 'U. a. Ryanair, easyJet (T2C). Aerobús A2, Metro L9 Sud, Regionalzug R2 Nord (nur hier!).' },
      { icon: '⚠️', name: 'Terminal vorher prüfen!', info: 'Für den Rückflug nach Berlin (BER) unbedingt auf Bordkarte/Buchung nachsehen, ob T1 oder T2 – die Terminals liegen ca. 4 km auseinander.' },
      { icon: '🚉', name: 'Barcelona Sants', info: 'Hauptbahnhof (AVE, Fernzüge, R2 Nord).' },
      { icon: '🚉', name: 'Passeig de Gràcia (Rodalies)', info: 'Halt der R2 Nord mitten im Zentrum, Umstieg zur Metro L2/L3/L4.' },
      { icon: '🚇', name: 'Monumental / Sagrada Família', info: 'Metro L2 (Monumental, Sagrada Família) bzw. L5 – je ca. 5–6 Min. zu Fuß zur Carrer d’Aragó 399.' }
    ],
    strecken: [
      {
        titel: 'Flughafen El Prat → Carrer d’Aragó 399', datum: 'Sa, 21.11. – Ankunft aus Athen',
        von: 'Aeropuerto de Barcelona-El Prat', nach: "Carrer d'Aragó 399, 08013 Barcelona",
        optionen: [
          { name: 'Aerobús + Metro L2', icon: '🚌', empfohlen: true,
            schritte: ['Aerobús vor dem Terminal (A1 ab T1, A2 ab T2), fährt alle 5–10 Min.', 'Bis Haltestelle „Plaça Universitat“ (ca. 30 Min.).', 'In der Station Universitat Metro L2 (lila) Richtung Badalona Pompeu Fabra.', 'Bis „Monumental“ (4 Stationen), dann ca. 5 Min. zu Fuß zur Carrer d’Aragó 399.'],
            dauer: 'ca. 50 Min.', preis: 'Aerobús ca. 7,45 € + Metro (mit T-casual 1,30 € pro Fahrt)', ticket: 'Aerobús: Automat an der Haltestelle oder kontaktlos im Bus · Metro: Automat (auch auf Deutsch)' },
          { name: 'Regionalzug R2 Nord + Metro L2 (nur ab T2)', icon: '🚆', schritte: ['Ab T2 zum Bahnhof (Fußgängerbrücke); von T1 erst kostenloser Shuttlebus zu T2.', 'R2 Nord bis „Passeig de Gràcia“ (ca. 25 Min., alle 30 Min.).', 'Umsteigen in Metro L2 bis „Monumental“ (3 Stationen), ca. 5 Min. zu Fuß.'], dauer: 'ca. 55 Min.', preis: 'Günstigste Variante: mit T-casual zählt Zug + Metro als eine Fahrt (1,30 €); Einzelticket ca. 5 €', ticket: 'Automat am Bahnhof, T-casual gilt (Zone 1)' },
          { name: 'Metro L9 Sud', icon: '🚇', schritte: ['Ab beiden Terminals.', 'L9 Sud bis „Torrassa“, Umstieg L1 bis „Clot“, dann L2 bis „Monumental“ – mehrmals umsteigen.'], dauer: 'ca. 60–70 Min.', preis: 'Flughafenticket 5,90 € (offiziell TMB; die T-casual gilt hier nicht)', ticket: 'Automat am Flughafen' },
          { name: 'Taxi', icon: '🚕', schritte: ['Offizieller Taxistand vor dem Terminal (schwarz-gelbe Taxis).', 'Taxameter läuft, Flughafenzuschlag ist erlaubt.'], dauer: 'ca. 25–35 Min.', preis: 'ca. 35–45 €', ticket: 'Im Taxi (Karte meist möglich)' }
        ],
        empfehlung: 'Aerobús bis Plaça Universitat und dann L2 bis Monumental – einfach, gepäckfreundlich, ohne langes Umsteigen. Mit T-casual ist die R2-Nord-Variante ab T2 die günstigste.'
      },
      {
        titel: 'Carrer d’Aragó 399 → Flughafen El Prat', datum: 'Sa, 28.11. – Rückflug nach Berlin (BER)',
        von: "Carrer d'Aragó 399, 08013 Barcelona", nach: 'Aeropuerto de Barcelona-El Prat',
        optionen: [
          { name: 'Metro L2 + Aerobús', icon: '🚌', empfohlen: true,
            schritte: ['Zuerst Terminal prüfen: T1 → Aerobús A1, T2 → Aerobús A2!', 'Ca. 5 Min. zu Fuß zu „Monumental“, Metro L2 bis „Universitat“.', 'Ca. 6 Min. zu Fuß zur Plaça de Catalunya (Abfahrt Aerobús, Ecke Ronda Universitat / Plaça Catalunya).', 'Aerobús direkt zum richtigen Terminal (ca. 35 Min.).'],
            dauer: 'ca. 60 Min.', preis: 'ca. 7,45 € + Metro', ticket: 'Aerobús-Automat oder kontaktlos' },
          { name: 'Metro L2 + R2 Nord (nur wenn Abflug T2)', icon: '🚆', schritte: ['Metro L2 bis „Passeig de Gràcia“, umsteigen in R2 Nord Richtung Aeroport.', 'Endstation = Terminal 2. Für T1: Shuttlebus (+15 Min.).'], dauer: 'ca. 50–65 Min.', preis: 'mit T-casual 1,30 €', ticket: 'T-casual oder Automat' },
          { name: 'Taxi', icon: '🚕', schritte: ['Taxi am Stand oder über App bestellen, Terminal angeben.'], dauer: 'ca. 25–35 Min.', preis: 'ca. 35–45 €', ticket: 'Im Taxi' }
        ],
        empfehlung: 'Terminal T1 oder T2 vorher in der Buchung prüfen! Dann L2 + Aerobús (A1 für T1, A2 für T2) oder Taxi. Mindestens 2 Stunden vor Abflug am Flughafen sein.'
      },
      {
        titel: 'Flughafen BER → Zuhause', datum: 'Sa, 28.11. – letzte Etappe',
        von: 'Flughafen BER Terminal 1-2', nach: 'Zuhause',
        optionen: [
          { name: 'Bahn ab BER', icon: '🚆', empfohlen: true, schritte: ['Bahnhof direkt unter Terminal 1-2.', 'FEX (Flughafen-Express) zum Hauptbahnhof, RE/RB oder S-Bahn S9/S45 – je nach Wohnort.', 'Ticket für die Tarifzone ABC nötig (BER liegt in Zone C).'], dauer: 'ca. 30–45 Min. bis in die Innenstadt', preis: 'Berlin ABC Einzelfahrt (ca. 5 €) bzw. Deutschlandticket gilt', ticket: 'BVG/VBB-App oder Automat im Bahnhof' },
          { name: 'Taxi', icon: '🚕', schritte: ['Taxistand vor Terminal 1.'], dauer: 'je nach Ziel', preis: 'in die Innenstadt ca. 50–70 €', ticket: 'Im Taxi' }
        ],
        empfehlung: 'Bahn ab BER; mit Deutschlandticket ohne Zusatzkosten.'
      }
    ],
    tipps: [
      'Ticket für die Woche: T-casual (10 Fahrten, eine Person, 13,00 € laut TMB seit 15.1.2026 – also 1,30 € pro Fahrt) reicht meist – Umsteigen innerhalb von 75 Min. zählt als eine Fahrt. Viel unterwegs? Hola Barcelona (ab 12,50 €, 2–5 Tage, inkl. Hin- und Rückfahrt Flughafen-Metro) oder T-dia (24 h, ab 12 €, je eine Fahrt zum/vom Flughafen-Metro) prüfen.',
      'Die T-casual gilt NICHT an den Metro-Stationen am Flughafen (L9 Sud, Flughafenticket 5,90 €), wohl aber für den Zug R2 Nord und den Rest des Netzes.',
      'Taschendiebe: auf La Rambla, in der Metro (L3, L1) und im Aerobús Wertsachen vorne tragen.',
      'Taxi: nur schwarz-gelbe Taxis mit Taxameter. Angebote von Fahrern im Ankunftsbereich ablehnen.',
      'Terminal für den Rückflug nach BER (T1 oder T2) am Vortag in der Airline-App prüfen.'
    ]
  }
};
