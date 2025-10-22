# Note Trainer Desktop

A desktop application for practicing reading musical notes, built with Electron, React, and TypeScript.

![Note Trainer App Screenshot](/docs/demo.png)

## Features

- **Note Recognition Practice:** Displays a random note on a musical staff for you to identify.
- **Level Progression:** Start at level 1 and progress to higher levels with more notes.
- **Statistics Tracking:** Tracks your score, streak, and accuracy.
- **Persistent Data:** Your game progress is saved locally.
- **Level Selection:** Choose a specific level to practice.

## Gameplay

1.  A musical note will be displayed on the staff.
2.  Click the button corresponding to the correct note name (e.g., C, D, E, F, G, A, B).
3.  If you are correct, your score and streak will increase.
4.  If you are incorrect, your streak will reset.
5.  Gain experience with each correct answer and level up to unlock new challenges.
6.  You can also select a specific level to practice from the "select level" menu.

## Tech Stack

- **Framework:** [Electron](https://www.electronjs.org/)
- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Music Notation:** [VexFlow](https://www.vexflow.com/)
- **Database:** [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- **Build Tools:** [Electron-vite](https://electron-vite.github.io/), [Electron-builder](https://www.electron.build/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Version specified in `package.json`)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository.
2.  Navigate to the project directory.
3.  Install dependencies:

    ```bash
    npm install

    npm run postinstall
    ```

### Development

To run the application in development mode:

```bash
npm run dev
```

### Build

To build the application for your platform:

```bash
# For Windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
