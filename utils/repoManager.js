import simpleGit from "simple-git";
import fs from "fs-extra";
import path from "path";

const REPO_DIR = "./repos"; // Directory for cloned repos

// Clone the Git repository
export async function cloneRepository(repoUrl, repoName) {
    const repoPath = path.join(REPO_DIR, repoName);
    if (fs.existsSync(repoPath)) {
        return repoPath;
    }

    await simpleGit().clone(repoUrl, repoPath);
    return repoPath;
}

// Read all files from the repository
export async function readRepositoryFiles(repoPath) {
    const files = [];

    async function readDir(directory) {
        const items = await fs.readdir(directory);
        for (const item of items) {
            const fullPath = path.join(directory, item);
            const relativePath = fullPath.replace(repoPath, "").replace(/^\/|\\/, "");

            if (
                item === ".git" ||
                item === "requirements.txt" ||
                item === "README.md" ||
                item === "LICENSE"
            ) {
                continue;
            }

            const stat = await fs.stat(fullPath);
            if (stat.isDirectory()) {
                await readDir(fullPath);
            } else {
                const content = await fs.readFile(fullPath, "utf-8");

                files.push({ filename: relativePath, content: content.trim() });
            }
        }
    }

    await readDir(repoPath);
    return files;
}
