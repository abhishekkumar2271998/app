# stenoai reviewer notes

## Architecture
The `stenoai` codebase consists of a hybrid architecture that combines a Python backend with an Electron-based frontend, utilizing React and Vite for the UI. The project is organized into two main directories: `src/` for backend logic and `app/` for the Electron application, with the renderer components kept in `app/renderer/`. This modular structure facilitates a clear separation between the business logic and user interface layers.

## Conventions
- **Code Style**: For Python, the team adheres to [PEP 8](https://pep8.org/) guidelines, and for JavaScript/TypeScript, they use ES6 style with tools such as `eslint` and `prettier`. For example, seen in the `app/package.json`, scripts include `lint:renderer` to enforce code quality through linting.
- **Type Safety**: TypeScript is utilized throughout the frontend, ensuring strict type checking as specified in `app/renderer/tsconfig.json`.
- **Component Patterns**: The React components in `app/renderer/src` use functional components and hooks extensively, such as `useRecording` and `useSystemAudioCapture` to manage state and side effects.
- **Folder Structure**: The project follows a semantic naming convention, with clear delineation for main application components, routes, and utility functions found under distinct folders like `routes`, `components`, and `lib`.

## Intentional non-standard choices
- **Electron App Structure**: The main logic for the Electron app is separated into `main.js` and `preload.js`, with context bridging outlined clearly. The preload script intentionally restricts renderer access to only necessary APIs to ensure security. This may be flagged by bots as overly complex but is essential for maintaining a clean architectural separation.
- **Custom Protocol**: A custom protocol (`stenoai://`) is registered for capturing actions, which might look non-standard in some Electron applications. This is intended for operational simplicity and direct access by users or third-party applications.

## Watch out for
- **Dependency Management**: In `app/package.json`, ensure that the correct versions for dependencies are maintained, especially as false upgrades could break compatibility with the Python backend.
- **Type Safety**: Ensure no parts of the codebase introduce TypeScript errors or warnings. Check for any `any` types in `app/renderer/src` that could undermine the type safety provided by TypeScript.
- **Error Handling**: Review how errors are logged, especially in crucial areas such as the audio capturing and processing loops in `main.js`. Lack of robust error catching could lead to unresponsive application states.
- **Testing Robustness**: Ensure that end-to-end tests in folders containing test configurations, such as `e2e`, are comprehensive, particularly for user-triggered actions like starting and stopping recordings, as they are critical to functionality. The presence of `test:e2e` scripts suggests a focus on testing but warrants confirmation of coverage depth.
