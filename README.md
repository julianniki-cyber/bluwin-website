# BLUWIN — Innovative Windows

Static marketing website: plain HTML, CSS and JavaScript. No build step or dependencies.

## Open it

1. Open this folder in VS Code (**File → Open Folder…**).
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` → **Open with Live Server**.

You can also double-click `index.html` to open it in a browser.

## Files

```
bluwin-website/
├── index.html          Homepage (with the blinds-opening intro)
├── zebra.html          Collection page template (copy for other collections)
├── css/style.css       All styles; colours and fonts are variables at the top
├── js/main.js          Intro, scroll reveals, finish picker, form handling
└── assets/images/      Logo (transparent PNG), favicon mark, product photos
```

## Before going live

Search the project for `[` and `TODO` to find every placeholder:

- Phone, WhatsApp number (`wa.me/91…`), email, showroom address
- Project names, client review, fabric names/codes, specifications
- Connect the forms (`form[data-enquiry]`) to a real service, such as Formspree, Google Forms, your backend or a WhatsApp redirect. For now, `js/main.js` only shows a thank-you message.
- Replace the product photos with professional, high-resolution photography (at least 1600px wide). The current images are about 600px wide, taken from Instagram.

## Adding a collection page

Copy `zebra.html` (for example to `wooden-venetian.html`). Change the title, text, image, fabrics and specs. Then link it from the matching row in the homepage's `#collections` list.

## Adjusting the intro

- Timings: `.intro`, `.intro__slat` and `.intro__brand` in `css/style.css`, plus `INTRO_MS` in `js/main.js`
- Number of slats: `buildSlats()` in `js/main.js`
- To turn it off, delete the `<div class="intro" id="intro">` block in `index.html`, and remove `style="--delay: …"` from the two `.rise` elements.
