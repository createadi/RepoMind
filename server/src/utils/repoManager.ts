import fs from "fs-extra";
import path from "path";
import { simpleGit, SimpleGit } from "simple-git";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

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
        item === "package-lock.json" ||
        item.includes(".png")
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

// Fetch GitHub repository insights
export async function fetchRepoInsights(repoUrl: string): Promise<any> {
  try {
    const match = repoUrl.match(/github\.com\/(.+?)\/(.+?)(\.git|$)/);
    if (!match) {
      throw new Error("Invalid GitHub repository URL");
    }

    const [_, owner, repo] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repository insights: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      topLanguage: data.language,
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      watchers: data.watchers_count,
    };
  } catch (error) {
    throw new Error(`Error fetching repository insights: ${(error as any).message}`);
  }
}
