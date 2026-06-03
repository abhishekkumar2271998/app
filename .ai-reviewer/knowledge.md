# stenoai reviewer notes

## Architecture
The `stenoai` repository is an Electron-based application that provides an AI-powered intelligence layer for recording, transcribing, and summarizing conversations. The codebase is structured into two main folders: `app`, which contains the Electron desktop application and frontend (using React and Vite), and `src`, which hosts the Python backend responsible for audio processing and AI integrations.

## Conventions
- **File Naming**: File names use lowercase_with_underscores for Python files (e.g., `audio_recorder.py`, `transcriber.py`) and PascalCase for React components (e.g., `Home.tsx`, `Settings.tsx`).
- **Python Code Style**: The Python backend follows PEP 8 guidelines, including the use of type hints and docstrings. The linter `ruff` is required for code quality checks.
- **JavaScript/TypeScript Code Style**: The frontend adheres to JavaScript's standard conventions, including the use of semicolons and `const`/`let` for variable declarations. Consistent use of hooks (e.g., `useEffect`, `useLayoutEffect`) is observed for managing component lifecycles in React.
- **Project Structure**: The main project directory contains two primary components: the `app` folder (for front-end and Electron-specific code) and the `src` folder (for the Python backend). The `package.json` in the `app` directory defines npm scripts for managing both frontend and package-related tasks.

## Intentional non-standard choices
- **Node.js and Python Integration**: The choice of Python for backend processing and JavaScript for the frontend may appear as a separation of concerns. However, this hybrid architecture aims to leverage the strengths of both ecosystems effectively.
- **Global State Management with Custom Hooks**: A non-standard choice is the use of custom React hooks (like `useRecording`) for state management within the application, which provides a clear API to interact with shared functionalities.

## Watch out for
- **Error Handling**: Watch for inadequate error handling in asynchronous operations, especially when dealing with IPC (interprocess communication) between the renderer and main processes (`ipcRenderer.invoke` and `.send` methods in `preload.js`).
- **Dependency Management**: Ensure that all dependencies are correctly listed in `package.json` and that the Python environment is set up properly with required packages in `requirements.txt`. Missing dependencies can lead to runtime errors.
- **Sensitive Information**: Check for the presence of sensitive information in `.env` or code files and ensure that they are excluded from version control. The `.env` should not include sensitive API keys directly in code files.
- **Environment-Specific Code**: Be cautious when checking code that uses environment variables (like `process.env.STENOAI_E2E`) and ensure that there is clear documentation on the setup for E2E testing in `README.md` and `CONTRIBUTING.md`.