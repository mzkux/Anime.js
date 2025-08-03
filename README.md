# Anime.js React Vite Demo

This project is a simple, visually appealing demo for explaining the basics of [anime.js](https://animejs.com/) in a React + TypeScript + Vite environment. It is designed for clarity and minimalism, making it perfect for educational content such as YouTube tutorials.

## Features

- **Live Animations:** Demonstrates anime.js features including text, SVG, and shape animations.
- **Draggable Elements:** Interactive drag-and-drop using anime.js utilities.
- **Circle Position Tracking:** Shows real-time position updates for a moving circle.
- **Reusable Styles:** Includes reusable CSS classes for shapes (circle, square) to keep code clean and DRY.
- **Responsive & Modern UI:** Uses Tailwind CSS utility classes for layout and style.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/animejs-react-vite-demo.git
   cd animejs-react-vite-demo
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/App.tsx` — Main React component with all demo logic and UI.
- `src/App.css` — Custom styles including reusable `.circle` and `.square` classes.
- `public/` — Static assets.
- `vite.config.ts` — Vite configuration.

## Customization

- You can easily add more shapes or animations by using the `.circle` and `.square` classes in your JSX and updating the anime.js logic in `App.tsx`.
- Tailwind utility classes are used for rapid styling and layout.

## Why This Project?

- **Minimal & Clear:** Focuses on the essentials for teaching anime.js.
- **Easy to Extend:** Add more demos or styles as needed.
- **Ready for YouTube:** Clean code and UI for screen recording and explanation.

## License

MIT

---

Made with ❤️ for learning and sharing anime.js!
