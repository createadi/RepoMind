# RepoMind
![672AD7A1-5499-49AC-A4CB-0E4F886DB882_4_5005_c](https://github.com/user-attachments/assets/16f3e9ff-7850-4ae2-b296-3429d1e061d4)

RepoMind is an AI-powered tool that provides intelligent insights into Git repositories. It can generate comprehensive summaries and answer specific questions about a codebase, helping developers quickly understand project structure, key components, and functionality.

## Features

- **AI-Powered Summarization**: Get a high-level overview of any public Git repository. The AI analyzes the codebase and provides a concise summary.
- **Ask Questions**: Interact with the repository by asking specific questions about its implementation, logic, or structure.
- **Web Interface**: A clean and simple user interface built with React and Material-UI for easy interaction.
- **RESTful API**: Exposes endpoints for summarizing and querying repositories programmatically.

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Material-UI
- **Backend**: Node.js, Express.js, TypeScript
- **AI Integration**: Langchain.js, OpenAI API (gpt-4o-mini)
- **Git Operations**: `simple-git`

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/createadi/RepoMind.git
    cd RepoMind
    ```

2.  **Install root dependencies:**
    ```sh
    npm install
    ```

3.  **Install server dependencies:**
    ```sh
    cd server
    npm install
    ```

4.  **Install client dependencies:**
    ```sh
    cd ../client
    npm install
    ```

5.  **Set up environment variables:**
    Navigate back to the `server` directory and create a `.env` file. Add your OpenAI API key and an optional GitHub token for fetching repository stats.

    ```
    # server/.env
    OPENAI_API_KEY=your_openai_api_key
    GITHUB_TOKEN=your_github_personal_access_token
    ```

### Running the Application

From the root directory of the project, run the following command to start both the client and server concurrently:

```sh
npm run dev
```

The server will start on `http://localhost:3000` and the client will be available at `http://localhost:5173`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
