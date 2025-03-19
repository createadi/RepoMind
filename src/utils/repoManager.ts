import fs from "fs-extra";
import path from "path";
import { simpleGit, SimpleGit } from "simple-git";

const REPO_DIR = "./repos"; // Directory for cloned repos

// Clone the Git repository
export async function cloneRepository(
  repoUrl: string,
  repoName: string
): Promise<string> {
  const repoPath = path.join(REPO_DIR, repoName);
  if (fs.existsSync(repoPath)) {
    return repoPath;
  }

  const git: SimpleGit = simpleGit();
  await git.clone(repoUrl, repoPath);
  return repoPath;
}

// Read all files from the repository
export async function readRepositoryFiles(
  repoUrl: string,
  repoName: string
): Promise<{ filename: string; content: string }[]> {
  const repoPath = path.join(REPO_DIR, repoName);
  if (!fs.existsSync(repoPath)) {
    await cloneRepository(repoUrl, repoName);
  }

  const files: { filename: string; content: string }[] = [];

  async function readDir(directory: string) {
    const items = await fs.readdir(directory);
    for (const item of items) {
      const fullPath = path.join(directory, item);
      const relativePath = fullPath.replace(repoPath, "").replace(/^\/|\\/, "");

      if (
        item === ".git" ||
        item === "requirements.txt" ||
        item === "README.md" ||
        item === "LICENSE" ||
        item === "CONTRIBUTING.md" ||
        item === "CODE_OF_CONDUCT.md" ||
        item === "package.json" ||
        item === "package-lock.json"
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
