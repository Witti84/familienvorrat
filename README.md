# Familienvorrat

Checkliste für Moni, Sophi, Felix und Thomas. Statische, responsive Web-App ohne Build-Abhängigkeiten.

## GitHub und Vercel

1. Privates GitHub-Repository `familienvorrat` erstellen (ohne README/Lizenz/.gitignore initialisieren).
2. Die Dateien aus diesem Projekt direkt ins Repository-Hauptverzeichnis hochladen, nicht als zusätzlichen Unterordner.
3. Vercel → Add New → Project → GitHub-Repository importieren.
4. Projektname `familienvorrat`, Framework Preset **Other**, Root Directory `./`.
5. Build Command leer/deaktiviert, Install Command leer/deaktiviert, Output Directory nicht überschreiben. Keine Umgebungsvariablen erforderlich.
6. Deploy. Die von Vercel tatsächlich zugewiesene Produktions-URL verwenden.

## Funktionen

- Soll und Ist je Eintrag; ab Ist >= Soll automatisch erledigt.
- Aufgaben lassen sich per Checkbox erledigen (Ist wird Soll oder 0).
- Einträge je Kategorie anlegen, bearbeiten und löschen.
- Dezimalmengen, Suche, Statusfilter, Kategorieübersicht, Fortschritt.
- 300 Teelichter als Soll aufgenommen, Ist mangels Bestätigung 0.
- Bestätigte Ausgangsbestände übernommen; geplante Anschaffungen nicht als vorhanden markiert.
- Automatische Speicherung im localStorage des Browsers. Tabs desselben Browsers werden abgeglichen.
- JSON-Export/Import und Drucken.

## Grenzen der Speicherung

Keine Cloud-Datenbank und keine automatische Synchronisierung zwischen Handys/Computern. Browserdaten löschen oder Privatsitzungen können Bestände entfernen. Regelmässig exportieren. Daten auf eine andere URL werden nicht automatisch übernommen: dort importieren. Website und Ausgangsdaten sind für Besucher der URL sichtbar; noindex ist kein Passwortschutz. Persönliche Änderungen bleiben im jeweiligen Browser. Bei Bedarf später gemeinsame Speicherung mit Familienzugang ergänzen.

## Test

Mit Node.js: `node --test test.mjs`. Lokal mit einem statischen HTTP-Server öffnen. Keine externen Fonts oder Skripte.

Die .openai-Datei dient ausschliesslich der Entwicklungsvorschau und ist für Vercel nicht erforderlich.
