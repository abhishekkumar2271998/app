# abhishekkumar2271998/app reviewer notes

## Architecture
This codebase, named StenoAI, is organized primarily into an Electron application structured in a typical Model-View-Controller (MVC) pattern. The main components are a Python backend for handling audio recording and transcription, and a React-based frontend that utilizes Vite for building the user interface. The directory layout distinguishes between the core application (`src`) and the Electron renderer (`app`), making it easy to navigate and understand the roles of different components.

## Conventions
- **File Structure**: The `src` directory contains Python scripts with clear functionality (e.g., `audio_recorder.py`, `transcriber.py`), while the `app` directory contains the Electron-specific files (`main.js` for main process setup and `preload.js` for IPC communications) and a `renderer` folder for the frontend.
- **Python Style**: Follow PEP 8 guidelines strictly, including the use of type hints and docstrings. Linting is enforced with `ruff`, as seen in the `CONTRIBUTING.md`.
- **JavaScript Style**: JavaScript files use semicolons, and `const`/`let` should be preferred over `var`, aligning with best practices found in `package.json` scripts.
- **React Components**: Components are organized in a functional style using hooks for state management and side effects, as demonstrated in `renderer/src/App.tsx`.
- **Environment Configuration**: Use a `.env` file for environment-specific secrets, ensuring no sensitive data is hardcoded or exposed in the source code.

## Intentional non-standard choices
- The project uses a manual semantic versioning process where maintainers are solely responsible for version increments and releases. This is evident from the versioning guidelines in `CONTRIBUTING.md`, where contributors focus on code quality rather than versioning intricacies.

## Watch out for
- **Ensure Type Safety**: In TypeScript files, such as `renderer/src/App.tsx`, watch for missing type annotations that could lead to runtime errors.
- **Avoid Unused Imports**: The linter should catch unused imports, but it's good practice to verify that all imported modules or components are utilized correctly.
- **Async Handling**: Ensure that asynchronous calls, especially in IPC communication and during setup (e.g., in `main.js`), are handled properly to prevent unhandled promise rejections.
- **Accessibility and Focus Management**: Pay attention to accessibility practices such as focus management in user interface components to enhance user experience, especially in the frontend (React components).
- **Error Handling**: Make sure that proper error handling mechanisms are in place across backend Python services as well as in the Electron IPC to gracefully manage any potential failures during recording or transcription processes.