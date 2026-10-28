Built the expense tracker as a static web app:

- [index.html](</C:/Users/sasin/OneDrive/Documents/New project/index.html>)
- [styles.css](</C:/Users/sasin/OneDrive/Documents/New project/styles.css>)
- [script.js](</C:/Users/sasin/OneDrive/Documents/New project/script.js>)

It lets users add daily expenses with description, amount, date, and category; stores them in `localStorage`; shows totals, entry count, top category, a recent-expenses ledger, and a canvas pie chart spending “memory.”

I also started a local preview server here:

`http://127.0.0.1:4173`

Verification: `node --check script.js` passed. The in-app browser blocked both direct file access and the localhost URL in this session, so I couldn’t complete visual QA from inside Codex, but the app is ready to open in your browser.