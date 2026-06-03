# abhishekkumar2271998/app reviewer notes

## Architecture
This codebase implements a desktop application called Steno, which serves as a private stenographic assistant for audio recording, transcription, and summarization, utilizing AI. It uses Electron for the desktop app interface, React with TypeScript for the renderer, and Python for the backend audio processing. The structure is divided into an `app` directory for frontend code and a `src` directory for backend logic, alongside configuration files and scripts.

## Conventions
- **File Structure**: The main application files are organized under `app/`, with `main.js` serving as the entry point for the Electron application. Python backend files reside in `src/`, while the `renderer/` inside `app/` contains React components.
- **Naming Patterns**: React components follow PascalCase naming conventions (e.g., `AppShell`, `BottomDockSlot`). JavaScript variables typically use camelCase. Python files and function names adhere to snake_case.
- **Type Safety**: TypeScript is employed in the frontend with type annotations expected throughout, as per the `tsconfig.json` settings indicating strict mode.
- **Linting and Formatting**: JavaScript and TypeScript files use ESLint and Prettier for consistent formatting (e.g., `eslint` is defined in `package.json` scripts). Python code should be formatted using `ruff` as indicated in the `CONTRIBUTING.md`.
- **Documentation and Comments**: Functions and classes should include docstrings in Python (`src/`) and comments in JavaScript to enhance readability and maintainability.

## Intentional non-standard choices
- **Backend Communication**: The Electron app uses IPC (Inter-Process Communication) through a context bridge (`ipcRenderer` in `preload.js`) for communication between the React renderer and the Electron main process, which might not be common in all Electron apps.
- **Custom Environment Loader**: The `.env` loader in `main.js` is minimal and intended for the app to load environmental variables without external dependencies, unlike more standard libraries.

## Watch out for
- **Error handling with async operations**: In `main.js`, when performing filesystem or network operations, make sure to handle errors appropriately. For example, failing to check the status after `ipcRenderer.invoke()` can lead to unhandled promises.
- **Potential for memory leaks**: Ensure to clean up subscriptions and listeners in React components to avoid memory leaks, particularly for IPC events.
- **Hardcoded values**: Check for hardcoded strings, like color values or strings used for track names or response structures, that may need localization or formatting adjustments later.
- **Dependency Updates**: Libraries specified in `package.json` could become outdated; it's important to assess and update dependencies regularly to avoid security vulnerabilities.
- **Cross-platform Compatibility**: Since the app is designed for macOS, any system-specific calls (like those in `main.js` for system audio capture) should be cross-checked to ensure compatibility within Electron's framework based on the deployment target.