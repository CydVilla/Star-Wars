# Star Wars GIPHY Battle

A fun, mobile-optimized browser game where two random Star Wars characters duel with GIPHY-powered visuals and sound effects!

## Features
- **Random Star Wars duels** using [SWAPI.tech](https://swapi.tech/documentation) for character data
- **GIPHY integration** for animated character GIFs
- **Cinematic backgrounds** with dark overlays and blur
- **Sound effects and music** with a mute toggle (remembers position)
- **Mobile-first responsive design**
- **Single-duel enforcement** (no overlapping battles)
- **Score tracking** and replay
- **Dark/light theme toggle**

## How to Run Locally
1. **Clone or download this repo**
2. **Start a local server** (required for JS modules and API calls):
   - With Python 3:
     ```sh
     python3 -m http.server 8000
     ```
   - Or with Node.js:
     ```sh
     npx http-server .
     ```
3. **Open your browser to** [http://localhost:8000](http://localhost:8000)

## Controls
- **Duel**: Start a new random battle
- **Replay Battle**: Rematch with new random characters
- **Theme Toggle**: Switch between dark and light mode
- **Sound Toggle**: Mute/unmute all sounds (music resumes from where it left off)

## Troubleshooting
- If you see network errors for character data, SWAPI.tech may be down or rate-limited. Try again later or check their [status/docs](https://swapi.tech/documentation).
- If you see CORS or JS errors, make sure you are running a local server (not opening index.html directly).
- For best results, use a modern browser (Chrome, Firefox, Safari, Edge).

## Credits
- [SWAPI.tech](https://swapi.tech/documentation) for Star Wars data
- [GIPHY API](https://developers.giphy.com/) for GIFs
- Star Wars theme and laser sound: for demo/educational use only

---

Created with ❤️ for Star Wars fans!
