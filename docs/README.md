# Building a Rest API for querying cities in Brazil from scratch to production

Project developed during the Digital Innovation One Java Developer Bootcamp under the guidance of expert [André Gomes](https://www.linkedin.com/in/andreluisgomes/ "André Gomes").
Learning to develop a REST API to query Brazilian cities and retrieve comparative data.
Applying Java and Spring best practices, populating a PostgreSQL database, and creating a service to calculate the distance between cities.

**Language:** English (default) · Português (PT-BR) · Español (ES)  
**Stack:** HTML5 · CSS3 · JavaScript (vanilla)  
**Purpose:** Static, client-side demo to calculate approximate distances (km) between cities.

## Features

- **Dark / Light mode** with moon/sun icon (dark is default).
- **Multilanguage**: English (EN-US default), Português (PT-BR), Español (ES).
- **Accessible**: semantic HTML, ARIA attributes, keyboard focus styles.
- **Responsive**: works on desktop, tablet and smartphone.
- **Small and portable**: copy files to a folder and open `index.html`.

## Technologies Used

- **HTML** - main markup (semantic, accessible).
- **CSS** - styling, responsive and theme-aware.
- **JavaScript** - city data, translations, Haversine calculation, UI logic.

## How to use

1. Open `index.html` in your browser.
2. Select the origin and destination cities and click **Calculate**.
3. Toggle language and theme using the controls in the header.

## Notes about distances

- Distances are computed using the **Haversine formula** from the coordinates included in `script.js`.
- Coordinates are **approximate** and intended for demonstration only - not for navigation or precise routing.

## Accessibility & Semantics

- Form controls have labels and `aria` attributes.
- Buttons and interactive elements are keyboard accessible.
- Color contrast and focus outlines are provided for keyboard users.

## Customization ideas

- Replace or refine city coordinates with authoritative data.
- Add map integration (client-side) for visual routes.
- Persist theme and language preferences in `localStorage`.
- Add unit toggle (km / miles).

[LICENSE](/LICENSE)
