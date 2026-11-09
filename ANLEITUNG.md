# Reisebüchlein online stellen und auf dem Pixel installieren

Alles ist kostenlos. Ihr braucht nur ein GitHub-Konto (oder Netlify).

## Weg A: Netlify Drop (am einfachsten, 2 Minuten, kein Programm nötig)

1. Am Computer https://app.netlify.com/drop öffnen und ein kostenloses Konto anlegen (E-Mail genügt).
2. Den ganzen Ordner `Reise` mit der Maus auf die Seite ziehen.
   (Die PDF darf mit, schadet nicht. Wer will, kann sie vorher herausnehmen.)
3. Nach ein paar Sekunden zeigt Netlify eine Adresse wie `https://irgendwas.netlify.app`. Das ist eure App.
4. Optional: unter "Site configuration > Change site name" einen schönen Namen vergeben.

## Weg B: GitHub Pages

1. Auf https://github.com ein kostenloses Konto anlegen.
2. Oben rechts "+" > "New repository". Name z. B. `reisebuechlein`, "Public", dann "Create repository".
3. Auf der leeren Repository-Seite "uploading an existing file" anklicken.
4. Alle Dateien und Ordner aus `Reise` in das Fenster ziehen (`index.html`, `app.js`, `style.css`, `style2.css`, `data.js`, `credits.js`, `info.js`, `anreise.js`, alle `sprache-….js`, `sw.js`, `manifest.webmanifest` und die Ordner `icons`, `images` und `leaflet`). Unten "Commit changes".
5. "Settings" > "Pages" > bei "Branch" `main` und `/ (root)` wählen > "Save".
6. Nach 1 bis 2 Minuten steht oben die Adresse `https://DEINNAME.github.io/reisebuechlein/`.

## Auf dem Pixel installieren

1. Am Pixel **Chrome** öffnen und die Adresse eurer App aufrufen.
2. Einmal komplett laden lassen (am besten mit WLAN, die App lädt dabei alle Bilder für offline, ca. 26 MB).
3. Chrome-Menü (drei Punkte oben rechts) > **"App installieren"** oder **"Zum Startbildschirm hinzufügen"** > bestätigen.
4. Das Symbol liegt jetzt auf dem Startbildschirm. Beim Öffnen läuft die App wie eine normale App, auch ohne Internet.
5. Zum Testen: Flugmodus an und die App öffnen. Alles muss weiter funktionieren.

## Wichtig

- **Erst online öffnen**, dann geht sie offline. Der erste Aufruf lädt alles in den Speicher des Handys.
- **Eigene Fotos, Haken und Notizen** liegen nur auf dem Handy. Macht vor der Reise und danach unter "Daten" > "Exportieren" eine Sicherung und teilt sie z. B. an euch selbst oder die Claude-App.
- Chrome-Daten nicht löschen ("Websitedaten löschen" entfernt auch die App-Daten).
- **Neue Version einspielen:** geänderte Dateien wieder hochladen und in `sw.js` die Zahl bei `reisebuechlein-v4` erhöhen (z. B. `v5`). Ab dieser Version lädt die App online immer die neueste Fassung. Wer noch eine ältere Version installiert hat, öffnet die App nach dem Hochladen zweimal.
- **Neue Reise von Claude erstellen lassen:** `reise-vorlage.json` an Claude geben, z. B. „Erstelle mir nach dieser Vorlage eine Reise nach … vom … bis … mit Orten, Infos, Anreise und großem Sprachführer“. Die fertige Datei aufs Handy laden und in der App unter **Reisen › Reise importieren** einlesen. Die Vorlage muss nicht mit hochgeladen werden.
- **Vorlese-Stimmen:** Fehlt eine Sprache, zeigt der Sprachführer eine Anleitung. Prüfen könnt ihr jederzeit unter **Daten › Vorlese-Stimmen**. Einmal heruntergeladene Stimmen funktionieren offline.
- **Offline-Grenzen:** Alles funktioniert offline, außer dem Kartenhintergrund (die Pins bleiben sichtbar) und der Spracheingabe in der App (sie braucht in Chrome Internet). Offline geht das Mikrofon der Handy-Tastatur.
- **Standort und Mikrofon:** Chrome fragt beim ersten Benutzen nach Erlaubnis. Wer aus Versehen „Blockieren“ getippt hat: Chrome > Schloss-Symbol neben der Adresse > Berechtigungen.
- **Abend-Erinnerung:** Ab 20 Uhr fragt die App „Heute schon gesichert?“. „Jetzt sichern“ öffnet das Teilen-Menü, dort z. B. „Drive“ wählen.
- **Bilder:** Titelbilder stammen von Wikimedia Commons, Urheber und Lizenz stehen unter jedem Bild. Für drei Unterkünfte und Gazi gibt es kein Bild, dort zeigt die App eine türkise Farbfläche.
