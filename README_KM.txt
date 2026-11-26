# OUR LOVE STORY ❤️ — Website starter

This is a ready-to-customize romantic photo website. It includes a starry background, animated floating photos, a music button, a love message, and an automatic QR code after publishing.

## Add your 20–50 photos
1. Open `assets/photos/`.
2. Add your pictures as JPG files named exactly:
   `01.jpg`, `02.jpg`, `03.jpg` ... up to `50.jpg`.
3. You can use JPG/JPEG images. For best loading speed, resize photos to around 1200px on the long edge.

## Add your song
1. Put one MP3 file in `assets/music/`.
2. Rename it to `song.mp3`.
3. Browsers require a tap before music can start, so visitors press “Play our song”.

## Change the love message
Open `index.html` in a text editor and find:
`Thank you for being part of my story...`
Replace it with your own message.

## Publish and get your QR code (free option)
1. Keep `index.html` and the `assets` folder together.
2. Open https://app.netlify.com/drop in a browser.
3. Sign in or create a free Netlify account.
4. Upload/drag the whole `our_love_story_website` folder (or unzip this package first and upload the extracted folder).
5. Netlify gives you a public website link.
6. Open that public link. The QR code appears automatically near the bottom.
7. Save/share the QR code or copy the website link.

Important:
- Do not share the Netlify upload folder publicly if you have private photos. Anyone with the website link can view the photos.
- QR code is not available when opening `index.html` directly as a local file; it appears once the site is online.
- The website uses a small QR-code library from a public CDN, so QR generation needs an internet connection.
- This starter does not upload photos to a server by itself. Put the photos and song into the folders before publishing so everyone who opens the link can see/hear them.
