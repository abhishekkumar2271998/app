# stenoai reviewer notes

## Architecture
The StenoAI codebase consists of a Python backend and an Electron frontend. The **src/** directory holds Python scripts for functionalities such as audio recording (audio_recorder.py) and transcription (transcriber.py), while the **app/** directory contains the Electron app with React as the front-end framework, using Vite for builds. The project organizes its components with a clear separation between the two layers, allowing for maintainable and coherent development.

## Conventions
- **File Structure**: The project follows a structured layout with the **src/** directory dedicated to the Python backend and **app/** for the Electron app. For example, the Python modules for recording and transcription are kept under **src/audio_recorder.py** and **src/transcriber.py** respectively.
  
- **Python Code Style**: The team adheres to PEP 8 standards and uses type hints where appropriate, as indicated in **CONTRIBUTING.md**. Functions and classes must have docstrings for better documentation.

- **JavaScript Code Style**: In **app/package.json**, it's noted that JavaScript code should use semicolons, const/let instead of var, and follow patterns established in the existing codebase.

- **Testing Procedures**: The development workflow emphasizes testing local changes via command-line commands described in **CONTRIBUTING.md**, e.g., `python simple_recorder.py --help` for Python and `npm start` for the Electron app.

- **Environment Management**: Developers must use a Python virtual environment as specified in **CONTRIBUTING.md**, ensuring that dependencies are isolated.

- **Semantic Versioning**: The project uses manual semantic versioning as outlined in **CONTRIBUTING.md**. 

- **TailwindCSS**: In the Electron app, TailwindCSS is set up with custom configurations in **app/renderer/tailwind.config.cjs** to ensure a consistent styling approach across the app.

## Intentional non-standard choices
- **Environment Variable Management**: The **main.js** file implements a custom minimal .env loader function that reads environment variables from a .env file. This avoids the need for an external library, offering a lightweight solution to manage secrets without compromising on security.

- **Protocol Registration for Shortcuts**: In **main.js**, a protocol registration function is established to handle custom URL schemes (`stenoai://`) for activating functionalities from external applications. This approach may appear unconventional but is crucial for enabling seamless integrations.

## Watch out for
- **Error Handling in IPC Communication**: The project uses IPC extensively for communication between the main and renderer processes. Inconsistencies in error handling or missed edge cases can lead to silent failures. Reviewing the **ipc** system in **preload.js** and **main.js** for robustness is critical.

- **Unconditional Trust in User Input**: The sanitization of incoming URLs in **main.js** should be thorough to prevent potential security vulnerabilities. The project sanitizes inputs but could be susceptible to malformed URLs if additional constraints aren’t enforced.

- **State Management in React**: In the **App.tsx** file, there’s a heavy reliance on side effects and complex state logic. Make sure that state transitions are appropriately managed, particularly in conditional routing and IPC handling.

- **Performance Issues in Recording**: The application involves heavy audio processing. It's important to ensure that the backend logic in **audio_recorder.py** and **transcriber.py** is performant, particularly under load, to prevent lags during user interactions.

By following these reviewer notes, you will maintain the code quality and enhance collaboration within the development team effectively.