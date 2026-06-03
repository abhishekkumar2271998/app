# stenoai reviewer notes

## Architecture
This codebase is a macOS desktop application built using Electron, React, and a Python backend. It combines audio recording, transcription, and summarization features, serving as a private AI-powered stenographer for confidential conversations. The structure separates client-side and server-side concerns, with `src` containing the Python backend and `app/renderer` handling the React frontend.

## Conventions
- **File Structure:** The main application files are under `app/` inclusive of `main.js` for the Electron main process and the `renderer/` directory for React. Python code resides in `src/`, which contains `audio_recorder.py`, `transcriber.py`, and `summarizer.py`.
- **Script Naming:** The `package.json` uses descriptive script names for commands like `start`, `build`, `dev:renderer`, and `lint:renderer`, enhancing clarity when executing tasks (found in `app/package.json`).
- **JavaScript Style:** The team adheres to specific rules such as always using semicolons and preferring `const` and `let` over `var`, as stated in `CONTRIBUTING.md`.
- **Types and React:** TypeScript is used in the frontend; all components are structured via functional React components and hooks, employing ESLint and Prettier for code quality (observed in `app/renderer/src/App.tsx`).
- **Tailwind CSS:** The project utilizes Tailwind CSS for styling, seen in `tailwind.config.cjs`, with a focus on class-based styling and responsive design adjustments.

## Intentional non-standard choices
- **Environment Handling:** The project employs a simple manual environment loader in `main.js` instead of using external libraries like `dotenv`. This non-standard choice aims to minimize dependencies and streamline the environment variables loading process.
- **Single Instance Application:** The use of `app.requestSingleInstanceLock()` in `main.js` allows the application to ensure only one instance runs at a time, minimizing potential conflicts with multiple windows.

## Watch out for
- **Import Paths:** Ensure all import paths in the renderer follow the configured aliases. Incorrect paths can lead to issues during building and running the application.
- **State Management:** The application uses React hooks for managing state, but make sure to avoid unnecessary renders. Utilize dependencies properly in effects to prevent stale state issues, especially in asynchronous operations and `useEffect` (as seen in `App.tsx`).
- **Type Checking:** Given the reliance on TypeScript, any missing type annotations in functions or props can lead to runtime issues. Always ensure types are explicitly defined, especially in dynamic functions like those in `ipc` communications.
- **Error Handling:** Pay careful attention to error handling in asynchronous functions, especially in the `main.js` where backend communication occurs. Ensure that errors are logged and do not crash the application.